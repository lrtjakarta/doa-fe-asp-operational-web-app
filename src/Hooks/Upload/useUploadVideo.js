import React, {
    useRef,
    useEffect,
    useState,
    useCallback,
    useContext,
  } from "react"
  import imageCompression from "browser-image-compression"
  import Api from "../../Services/ApiOperational"
  import moment from "moment"
  
  export default function useUploadImg() {
    const [isVideoValid, setIsVideoValid] = useState("")
    const [imageErrorMsg, setVideoErrorMsg] = useState("")
    const uploadedVideo = useRef(null)
    const [dialogVideoDelete, setDialogVideoDelete] = useState(false)
    const [dialogDelete, setDialogDelete] = useState(false)
    const [deleteVideoId, setDeleteVideoId] = useState(0)
    const [dialogUpload, setDialogUpload] = useState(false)
    const [loader, setLoader] = useState(false)
  
    function handleInputVideo() {
        uploadedVideo.current.click()
    }

    const handleDeleteVideo = () => {
        setDialogVideoDelete(false)
        const nameImg = deleteVideoId?.split("/")[4]
        
        const data = {
          fileName: nameImg,
          fileLocation: deleteVideoId,
        }
        
        Api.deleteImage(data).then((res) => {
          setVideoSrc("")
        }).catch((err) => {
          console.log(err)
        })
      }
  
    const handleOpenDialogDelete = (id) => {
      setDialogDelete(true)
    }

    const handleOpenDialogVideoDelete = (id) => {
        setDeleteVideoId(id)
        setDialogVideoDelete(true)
      }
  
    const handleCloseDialogDelete = () => {
      setDialogDelete(false)
      setDialogVideoDelete(false)
    }
  
    const handleOpenDialogUpload = () => {
      setDialogUpload(true)
    }
  
    const handleCloseDialogUpload = () => {
      setDialogUpload(false)
    }

    const [videoSrc , setVideoSrc] = useState("");

    const handleUploadVideo = (e,fileLocation, _id) => {
        setLoader(true)
        let reader = new FileReader()
        let file = e?.target?.files[0],pattern = /video-*/
        console.log("file",file)
        if (!file.type.match(pattern)) {
            setIsVideoValid(true)
            setVideoErrorMsg("Format File tidak sesuai")
          }
      reader.onloadend = () => {
        const base64String = reader.result.replace("data:", "").replace(/^.+,/, "")
        const dateNow = Date.now()
        const datapost = {
            rootfile: `repo/video/${fileLocation}/${_id}/`,
            filename: `video-${dateNow}.mp4`,
            filedata: base64String,
          }
          Api.postUploadImgBase(datapost)
            .then((res) => {
              setVideoSrc(res.data)
              setDialogUpload(false)
              setLoader(false)
            })
            .catch((err) => {
              console.log(JSON.stringify(err))
              setLoader(false)
          })
      }
      reader.readAsDataURL(file)
    };
  
    return {
      uploadedVideo,
      handleInputVideo,
      handleUploadVideo,
      dialogDelete,
      setDialogDelete,
      handleOpenDialogDelete,
      handleCloseDialogDelete,
      videoSrc,
      handleOpenDialogVideoDelete,
      dialogUpload,
      handleOpenDialogUpload,
      handleCloseDialogUpload,
      loader,
      setLoader,
      handleDeleteVideo,dialogVideoDelete,
    }
  }
  