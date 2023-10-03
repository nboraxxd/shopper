import { useRef, useState } from 'react'

export default function UploadImage({ children, onChange }) {
  const [imageReview, setImageReview] = useState()
  const fileRef = useRef()

  function onPreview() {
    if (fileRef.current.files[0]) {
      const reader = new FileReader()
      onChange?.(fileRef.current.files[0])
      reader.addEventListener('load', () => {
        setImageReview(reader.result)
      })

      reader.readAsDataURL(fileRef.current.files[0])
    }
  }

  function trigger() {
    fileRef.current.click()
  }

  return (
    <>
      <input type="file" accept="image/*" hidden ref={fileRef} onChange={onPreview} />
      {children(imageReview, trigger)}
    </>
  )
}
