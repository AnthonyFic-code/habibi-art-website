export default eventHandler(async (event) => {
  await requireUserSession(event)
  // console.log(event)  

  // https://hub.nuxt.com/docs/storage/blob#handleupload
  const uploadObj = await hubBlob().handleUpload(event, {
    multiple: false,
    addRandomSuffix: true,
    maxSize: '64MB',
    types: ['image/jpeg', 'image/png', 'image/gif', 'image/heic', 'image/webp', 'image/jpg']
  })
  const fileName = uploadObj[0].pathname.split('.')[0]
  hubKV().set(fileName, {"name": fileName, "description": "Sample description; needs to be updated.", "status": "Unset"})
  return uploadObj
})
