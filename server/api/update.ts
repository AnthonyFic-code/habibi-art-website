export default eventHandler(async (event) => {
  const body = await readBody(event) || {}
  const session = await getUserSession(event)
  const userLoggedIn = session.user != null && session.user.role == "admin"
  if (session.lastAttemptAt && Date.now() - session.lastAttemptAt < 1000)
    throw createError({ statusCode: 429, statusMessage: 'Too Many Requests' })

  if (userLoggedIn) {
    let updated_args = await hubKV().get(body.file)
    console.log(body.newArgs)
    // If any of these are null, there's a bigger issue.
    // So we can ignore the 'updated_args' is possibly 'null' error (warn?)
    updated_args.name = body.newArgs.name || updated_args.name
    updated_args.description = body.newArgs.description || updated_args.description
    updated_args.status = body.newArgs.status || updated_args.status
    hubKV().set(body.file, updated_args)
    return
  }

  await setUserSession(event, { lastAttemptAt: Date.now() })

  throw createError({ statusCode: 401, statusMessage: 'Unauthorized' })
})
