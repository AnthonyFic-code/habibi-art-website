export default eventHandler(async (event) => {
    const body = await readBody(event) || {}
    return hubKV().get(body.text)
})
