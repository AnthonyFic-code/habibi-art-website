export default eventHandler(async (event) => {
  const body = await readBody(event) || {}
  const session = await getUserSession(event)
  const userLoggedIn = true // TODO Let's just say it's always true for now 

  if (session.lastAttemptAt && Date.now() - session.lastAttemptAt < 1000)
    throw createError({ statusCode: 429, statusMessage: 'Too Many Requests' })

  if (userLoggedIn) {
    hubKV().set(body.file, body.newArgs)
    return
  }

  await setUserSession(event, { lastAttemptAt: Date.now() })

  throw createError({ statusCode: 401, statusMessage: 'Unauthorized' })
})
