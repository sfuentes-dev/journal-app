export const fileUpload = async (file) => {
  // if (!file) throw new Error('We do not have any files to upload')
  if (!file) return null

  const clodUrl = `https://api.cloudinary.com/v1_1/sfuentes-dev16/upload`

  const formData = new FormData()
  formData.append('upload_preset', 'react-journal')
  formData.append('file', file)

  try {
    const resp = await fetch(clodUrl, {
      method: 'POST',
      body: formData,
    })

    if (!resp.ok) throw new Error('Image could not be uploaded')

    const cloudResp = await resp.json()

    return cloudResp.secure_url
  } catch (error) {
    // console.log(error)
    // throw new Error(error.message)
    return null
  }
}
