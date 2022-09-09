import React, { useEffect, useRef, useState } from 'react'
import axios from 'axios'

import {BsCameraFill} from 'react-icons/bs';

import './AvatarInput.css'

const AvatarInput = ({
  defaultImage,
  name,
  onChange
}) => {
  const [imageUrl, setImageUrl] = useState('')
  const inputRef = useRef(null)

  const checkImage = async (path) => {
    return await axios
      .get(path)
      .then(() => {
        return true;
      })
      .catch(() => {
        return false;
      });
  }

  useEffect(() => {
    (async () => {
      if (await checkImage(defaultImage)) {
        setImageUrl(defaultImage) 
      }
    })()
  }, [defaultImage])

  const handleOpenUploader = () => {
    if (inputRef && inputRef.current) {
      inputRef.current.click()
    }
  }

  const handleFileChange = (e) => {
    const files = e.target.files
    if (files.length > 0) {
      onChange(files[0])
      const objectUrl = URL.createObjectURL(files[0])
      setImageUrl(objectUrl)
    }
  }

  return (
    <>
      <div className='avatar-input-container'>
        <div className='avatar-input-imageviewer' onClick={handleOpenUploader}>
          {
            imageUrl ? (
              <img src={imageUrl} />
            ) : (
              <img src="/images/avatar.png" />
            )
          }
          <div className='avatar-input-camera-icon'>
            <BsCameraFill size={20} />
          </div>
        </div>
      </div>
      <input type="file" name={name} className='avatar-input' accept="image/*" ref={inputRef} onChange={handleFileChange} />
    </>
  )
}

export default AvatarInput