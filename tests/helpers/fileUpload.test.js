import { fileUpload } from '../../src/helpers/fileUpload'
import { v2 as cloudinary } from 'cloudinary'

cloudinary.config({
  cloud_name: 'sfuentes-dev16',
  api_key: '954791121425873',
  api_secret: '7R7y6TdD1s_iHdYL6r-okurtt_M',
  secure: true,
})

describe('Test on File Upload', () => {
  test('should upload the file correctly', async () => {
    const imageUrl =
      'https://www.senpai.com.mx/wp-content/uploads/2021/10/Kimetsu-no-Yaiba-anime-celebra-su-regreso-a-la-television-con-ilustraciones-de-Rengoku.jpg'

    const resp = await fetch(imageUrl)
    const blob = await resp.blob()
    const file = new File([blob], 'photo.jpg')

    const url = await fileUpload(file)
    expect(typeof url).toBe('string')

    const segments = url.split('/')
    const imageId = segments[segments.length - 1].replace('.jpg', '')

    const cloudResp = await cloudinary.api.delete_resources(
      ['journal-app/' + imageId],
      {
        resource_type: 'image',
      }
    )
    console.log(cloudResp)
  })

  test('should return null', async () => {
    const file = new File([], 'photo.jpg')

    const url = await fileUpload(file)

    expect(url).toBe(null)
  })
})
