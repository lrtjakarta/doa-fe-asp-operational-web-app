import imageCompression from "browser-image-compression";
import _ from "lodash";
import { useRef, useState } from "react";
import { toast } from "react-toastify";
import Api from "../../Services/ApiOperational";
import getCroppedImg from "../../Utils/CroppedImage";

export default function useUploadImg() {
  const [image, setImage] = useState(null);
  const [multiImage, setMultiImage] = useState([]);
  const [imagePreview, setImagePreview] = useState("");
  const [isImageValid, setIsImageValid] = useState("");
  const [imageErrorMsg, setImageErrorMsg] = useState("");
  const [repoImg, setRepoImg] = useState("");
  const uploadedImage = useRef(null);
  const multiUploadedImage = useRef(null);
  const uploadedDoc = useRef(null);
  const uploadedVideo = useRef(null);
  const editedVideo = useRef(null);
  const [dialogVideoDelete, setDialogVideoDelete] = useState(false);
  const [dialogDelete, setDialogDelete] = useState(false);
  const [deleteIdImage, setDeleteIdImage] = useState("");
  const [editedFile, setEditedFile] = useState("");
  const [file, setFile] = useState("");
  const [deleteIdVideo, setDeleteIdVideo] = useState("");
  const [dialogUpload, setDialogUpload] = useState(false);
  const [loader, setLoader] = useState(false);
  const [openImg, setOpenImg] = useState(false);
  const [openCamera, setOpenCamera] = useState(false);
  const [crop, setCrop] = useState({ x: 0, y: 120 });
  const [size, setSize] = useState({ width: 3840, height: 1920 });
  const [zoom, setZoom] = useState(1);
  const [videoSrc, setVideoSrc] = useState([]);
  const [videoFilename, setVideoFilename] = useState("");

  const resetState = () => {
    setImage(null);
    setMultiImage([]);
    setCrop({ x: 0, y: 120 });
    setSize({ width: 3840, height: 1920 });
    setZoom(1);
    setEditedFile("");
  };

  const onCropComplete = (croppedArea, croppedAreaPixels) => {
    setSize(croppedAreaPixels);
  };

  const onChangeZoom = (event, newValue) => {
    if (typeof newValue === "number") {
      setZoom(newValue);
    }
  };

  const calculateZoom = (value) => {
    return 1 + value;
  };

  const handleCancelCrop = () => {
    setImage(null);
    setCrop({ width: 3840, height: 1920, x: 0, y: 120 });
    setZoom(1);
  };

  const handleEditCrop = async (e, fileLocation, _id, typedata) => {
    await setLoader(true);
    const imageResize = await getCroppedImg(e, size);
    const base64String = imageResize.replace("data:", "").replace(/^.+,/, "");
    const dateNow = Date.now();
    const datapost = {
      rootfile: `uploads/img/${fileLocation}/${_id}/`,
      filename: `image-${dateNow}.png`,
      filedata: base64String,
    };
    Api.postUploadImgBase(datapost)
      .then(async (res) => {
        if (typedata === "object") {
          const postImg = { file: res.data };
          await setImage(postImg);
        } else {
          const postImg = res.data;
          await setImage(postImg);
        }
        await setDialogUpload(false);
        await setLoader(false);
      })
      .catch((err) => {
        console.log(JSON.stringify(err));
        setLoader(false);
      });
  };

  const handleUploadImg = (e) => {
    let reader = new FileReader();
    let file = e.target.files[0],
      pattern = /image-*/;

    if (!file.type.match(pattern)) {
      setIsImageValid(true);
      setImageErrorMsg("Format File tidak sesuai");
    }

    var options = {
      maxSizeMB: 0.1,
      maxWidthOrHeight: 3000,
      useWebWorker: true,
    };

    imageCompression(file, options)
      .then(function (compressedFile) {
        reader.onloadend = () => {
          setIsImageValid(false);
          setImageErrorMsg("");
          setImagePreview(reader.result);
        };

        let upload = new FormData();
        upload.append("image", compressedFile);

        Api.postUploadImg(upload).then((res) => {
          setImage(res.data);
        });

        reader.readAsDataURL(file);
      })
      .catch(function (error) {
        console.log(error.message);
      });
  };

  function handleInputImage() {
    uploadedImage.current.click();
  }

  function handleInputDoc() {
    uploadedDoc.current.click();
  }

  const handleMultiUploadImg = (e) => {
    let reader = new FileReader();
    let file = e.target.files[0],
      pattern = /image-*/;

    if (!file.type.match(pattern)) {
      setIsImageValid(true);
      setImageErrorMsg("Format File tidak sesuai");
    }
    var options = {
      maxSizeMB: 0.1,
      maxWidthOrHeight: 3000,
      useWebWorker: true,
    };

    imageCompression(file, options)
      .then(function (compressedFile) {
        reader.onloadend = () => {
          setIsImageValid(false);
          setImageErrorMsg("");
          setImagePreview(reader.result);
        };

        let upload = new FormData();
        upload.append("image", compressedFile);

        Api.postUploadImg(upload)
          .then((res) => {
            setRepoImg(res.data);
            let postImg = [...multiImage, res.data];
            let saveData = postImg.filter((item) => item !== "");
            setMultiImage(saveData);
          })
          .catch((err) => {
            console.log(err);
          });

        reader.readAsDataURL(file);
      })
      .catch(function (error) {
        console.log(error.message);
      });
  };

  function handleMultiInputImage() {
    multiUploadedImage.current.click();
  }

  function handleMultiInputImage() {
    multiUploadedImage.current.click();
  }

  function handleInputVideo() {
    uploadedVideo.current.click();
  }

  function handleInputEditVideo(item) {
    editedVideo.current.click();
    setEditedFile(item.file);
  }

  const handleMultiUploadImgBase = async (
    e,
    fileLocation,
    _id,
    type,
    typedata
  ) => {
    await setOpenCamera(false);
    await setOpenImg(false);
    await setLoader(true);

    if (type === "upload") {
      let reader = new FileReader();
      let file = e?.target?.files[0],
        pattern = /image-*/;

      if (!file.type.match(pattern)) {
        setIsImageValid(true);
        setImageErrorMsg("Format File tidak sesuai");
      }

      reader.onloadend = () => {
        const base64String = reader.result
          .replace("data:", "")
          .replace(/^.+,/, "");
        const dateNow = Date.now();
        const datapost = {
          rootfile: `uploads/img/${fileLocation}/${_id}/`,
          filename: `image-${dateNow}.png`,
          filedata: base64String,
        };
        Api.postUploadImgBase(datapost)
          .then((res) => {
            setRepoImg(res.data);
            if (typedata === "object") {
              const postImg = [...multiImage, { file: res.data }];
              const saveData = postImg.filter((item) => item.file !== "");
              setMultiImage(saveData);
            } else {
              const postImg = [...multiImage, res.data];
              const saveData = postImg.filter((item) => item !== "");
              setMultiImage(saveData);
            }
            setDialogUpload(false);
            setLoader(false);
          })
          .catch((err) => {
            console.log(JSON.stringify(err));
            setLoader(false);
          });
      };
      reader.readAsDataURL(file);
      reader.onabort = () => {
        setLoader(false);
      };
    } else {
      const base64String = e.replace("data:", "").replace(/^.+,/, "");
      const dateNow = Date.now();
      const datapost = {
        rootfile: `uploads/img/${fileLocation}/${_id}/`,
        filename: `image-${dateNow}.png`,
        filedata: base64String,
      };
      Api.postUploadImgBase(datapost)
        .then((res) => {
          setRepoImg(res.data);
          if (typedata === "object") {
            const postImg = [...multiImage, { file: res.data }];
            const saveData = postImg.filter((item) => item.file !== "");
            setMultiImage(saveData);
          } else {
            const postImg = [...multiImage, res.data];
            const saveData = postImg.filter((item) => item !== "");
            setMultiImage(saveData);
          }
          setDialogUpload(false);
          setLoader(false);
        })
        .catch((err) => {
          console.log(JSON.stringify(err));
          setLoader(false);
        });
    }
  };

  const handleUploadImgBase = async (e, fileLocation, _id, type, typedata) => {
    await setOpenCamera(false);
    await setOpenImg(false);
    await setLoader(true);

    if (type === "upload") {
      let reader = new FileReader();
      let file = e?.target?.files[0],
        pattern = /image-*/;

      if (!file.type.match(pattern)) {
        setIsImageValid(true);
        setImageErrorMsg("Format File tidak sesuai");
      }

      reader.onloadend = () => {
        const base64String = reader.result
          .replace("data:", "")
          .replace(/^.+,/, "");
        const dateNow = Date.now();
        const datapost = {
          rootfile: `uploads/img/${fileLocation}/${_id}/`,
          filename: `image-${dateNow}.png`,
          filedata: base64String,
        };

        Api.postUploadImgBase(datapost)
          .then((res) => {
            if (typedata === "object") {
              const postImg = { file: res.data };
              setImage(postImg);
            } else {
              const postImg = res.data;
              setImage(postImg);
            }
            setDialogUpload(false);
            setLoader(false);
          })
          .catch((err) => {
            console.log(JSON.stringify(err));
            setLoader(false);
          });
      };
      reader.readAsDataURL(file);
      reader.onabort = () => {
        setLoader(false);
      };
    } else {
      const base64String = e.replace("data:", "").replace(/^.+,/, "");
      const dateNow = Date.now();
      const datapost = {
        rootfile: `uploads/img/${fileLocation}/${_id}/`,
        filename: `image-${dateNow}.png`,
        filedata: base64String,
      };
      Api.postUploadImgBase(datapost)
        .then((res) => {
          setRepoImg(res.data);
          if (typedata === "object") {
            const postImg = { file: res.data };
            setImage(postImg);
          } else {
            const postImg = res.data;
            setImage(postImg);
          }
          setDialogUpload(false);
          setLoader(false);
        })
        .catch((err) => {
          console.log(JSON.stringify(err));
          setLoader(false);
        });
    }
  };

  const handleUploadDocBase = async (e, fileLocation, _id) => {
    await setLoader(true);
    let reader = new FileReader();
    let file = e?.target?.files[0],
      pattern = "application/pdf";

    if (!file.type.match(pattern)) {
      toast.error("Format File tidak sesuai");
    } else {
      reader.onloadend = () => {
        const base64String = reader.result
          .replace("data:", "")
          .replace(/^.+,/, "");
        // const dateNow = Date.now()
        const datapost = {
          rootfile: `uploads/doc/${fileLocation}/${_id}/`,
          filename: `${file.name}`,
          filedata: base64String,
        };
        Api.postUploadImgBase(datapost)
          .then((res) => {
            setFile(res.data);
            setLoader(false);
          })
          .catch((err) => {
            console.log(JSON.stringify(err));
            setLoader(false);
          });
      };
      reader.readAsDataURL(file);
      reader.onabort = () => {
        setLoader(false);
      };
    }
  };

  const handleDeleteImage = () => {
    setDialogDelete(false);
    const nameImg = deleteIdImage?.split("/")[4];

    const data = {
      fileName: nameImg,
      fileLocation: deleteIdImage,
    };

    console.log("data", data);

    return Api.deleteImage(data)
      .then((res) => {
        const postImg = [...multiImage];
        const saveData = postImg.filter((item) => item !== deleteIdImage);
        setMultiImage(saveData);
        return { status: "OK", result: res.data };
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleDeleteVideo = () => {
    const nameImg = deleteIdVideo?.split("/")[4];

    const data = {
      fileName: nameImg,
      fileLocation: deleteIdVideo,
    };

    return Api.deleteImage(data)
      .then((res) => {
        const postVid = [...videoSrc];
        const saveData = postVid.filter((item) => item !== deleteIdVideo);
        setVideoSrc(saveData);
        setDialogVideoDelete(false);
        return { status: "OK", result: res.data };
      })
      .catch((err) => {
        setDialogVideoDelete(false);
        console.log(err);
      });
  };

  const handleOpenDialogDelete = (id) => {
    console.log("id", id);
    setDeleteIdImage(id);
    setDialogDelete(true);
  };

  const handleOpenDialogVideoDelete = (id) => {
    setDeleteIdVideo(id);
    setDialogVideoDelete(true);
  };

  const handleCloseDialogDelete = () => {
    setDialogDelete(false);
    setDialogVideoDelete(false);
    setDeleteIdImage(0);
  };

  const handleOpenDialogUpload = () => {
    setDialogUpload(true);
  };

  const handleCloseDialogUpload = () => {
    setDialogUpload(false);
    setLoader(false);
  };

  const handleUploadVideo = (e, fileLocation, _id, typedata) => {
    setLoader(true);
    let reader = new FileReader();
    let file = e?.target?.files[0],
      pattern = /video-*/;
    if (!file.type.match(pattern)) {
      setIsImageValid(true);
      setImageErrorMsg("Format File tidak sesuai");
    }
    reader.onloadend = () => {
      console.log("reader", reader);
      const base64String = reader.result.replace(/^data:.*?,/, "");
      // .replace("data:", "")
      // .replace(/^.+,/, "");

      const dateNow = Date.now();
      const datapost = {
        rootfile: `uploads/video/${fileLocation}/${_id}/`,
        filename: `video-${dateNow}.mp4`,
        filedata: base64String,
      };

      Api.postUploadImgBase(datapost)
        .then((res) => {
          let videoName = res.data?.split("/");
          videoName = videoName[videoName.length - 1];
          if (videoName) {
            setVideoFilename(videoName);
          }
          if (typedata === "object") {
            const postVid = [...videoSrc, { file: res.data }];
            const saveData = postVid.filter((item) => item.file !== "");
            setVideoSrc(saveData);
          } else {
            const postVid = [...videoSrc, res.data];
            const saveData = postVid.filter((item) => item !== "");
            setVideoSrc(saveData);
          }
          reader.result = null;
          setDialogUpload(false);
          setLoader(false);
        })
        .catch((err) => {
          console.log(JSON.stringify(err));
          setLoader(false);
        });
    };

    reader.readAsDataURL(file);
    reader.onabort = () => {
      setLoader(false);
    };
  };

  const handleEditVideo = (e, fileLocation, _id) => {
    setLoader(true);
    let reader = new FileReader();
    let file = e?.target?.files[0],
      pattern = /video-*/;
    console.log("file", file);
    if (!file.type.match(pattern)) {
      setIsImageValid(true);
      setImageErrorMsg("Format File tidak sesuai");
    }
    reader.onloadend = () => {
      const base64String = reader.result
        .replace("data:", "")
        .replace(/^.+,/, "");
      const dateNow = Date.now();
      const datapost = {
        rootfile: `uploads/video/${fileLocation}/${_id}/`,
        filename: `video-${dateNow}.mp4`,
        filedata: base64String,
      };
      Api.postUploadImgBase(datapost)
        .then((res) => {
          let fileOld = videoSrc.filter((item) => item.file !== editedFile);
          let fileEdit = videoSrc.filter((item) => item.file === editedFile);
          let mergeFile = [...fileOld, { ...fileEdit[0], file: res.data }];
          let sortFile = _.orderBy(mergeFile, ["index"], ["asc"]);
          setVideoSrc(sortFile);
          reader.result = null;
          setDialogUpload(false);
          setLoader(false);
        })
        .catch((err) => {
          console.log(JSON.stringify(err));
          setLoader(false);
        });
    };
    reader.readAsDataURL(file);
    reader.onabort = () => {
      setLoader(false);
    };
  };

  return {
    handleUploadImg,
    handleInputImage,
    image,
    handleMultiUploadImg,
    handleMultiInputImage,
    uploadedVideo,
    handleInputVideo,
    handleUploadVideo,
    multiUploadedImage,
    multiImage,
    setMultiImage,
    imagePreview,
    isImageValid,
    imageErrorMsg,
    uploadedImage,
    handleUploadImgBase,
    setVideoSrc,
    uploadedDoc,
    repoImg,
    handleMultiUploadImgBase,
    handleUploadDocBase,
    dialogDelete,
    setDialogDelete,
    handleDeleteImage,
    handleOpenDialogDelete,
    handleCloseDialogDelete,
    deleteIdImage,
    videoSrc,
    handleInputDoc,
    setDeleteIdImage,
    handleOpenDialogVideoDelete,
    dialogUpload,
    handleEditVideo,
    handleOpenDialogUpload,
    handleCloseDialogUpload,
    handleInputEditVideo,
    editedVideo,
    loader,
    file,
    setFile,
    setLoader,
    size,
    setSize,
    openImg,
    setImage,
    handleDeleteVideo,
    dialogVideoDelete,
    setOpenImg,
    handleEditCrop,
    openCamera,
    deleteIdVideo,
    setDeleteIdVideo,
    setOpenCamera,
    onChangeZoom,
    handleCancelCrop,
    onCropComplete,
    calculateZoom,
    crop,
    setCrop,
    zoom,
    setZoom,
    resetState,
    videoFilename,
  };
}
