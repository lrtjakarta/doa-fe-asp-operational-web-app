import { useContext, useState } from "react";
import { InformationUploadContext } from "../../Context/index";

export default function useInformationUpload() {
  const {
    getDataInformationUpload,
    getDataInformationUploadV2,
    informationUpload,
    postDataInformationUpload,
    setInformationUpload,
    openSnackbar,
    setOpenSnackbar,
    putDataInformationUpload,
  } = useContext(InformationUploadContext);

  const [selectedData, setSelectedData] = useState({});
  const [openDialog, setOpenDialog] = useState(false);
  const [openForm, setOpenForm] = useState(false);
  const [action, setAction] = useState("");
  const [date, setDate] = useState("");
  const [typeInstruction, setTypeInstruction] = useState("Text");
  const [title, setTitle] = useState("");
  const [indexNumber, setIndexNumber] = useState(0);
  const [duration, setDuration] = useState(0);
  const [description, setDescription] = useState("");
  const [isPublished, setIsPublished] = useState(false);

  const submitDataInformationUpload = async (
    file,
    type,
    sendData,
    createdBy
  ) => {
    if (type === "image") {
      if (informationUpload.length > 0) {
        sendData = {
          ...sendData,
          image: [
            ...(informationUpload?.length > 0
              ? informationUpload[0]?.image
              : []),
            {
              file: file?.file,
              typeInstruction,
              title,
              description,
              duration,
              index: indexNumber,
              publish: isPublished,
            },
          ],
        };
        const response = await putDataInformationUpload(
          informationUpload[0]?._id,
          sendData
        );
        console.log("response", response);
        if (response.status === "OK") {
          setInformationUpload([sendData]);
          setOpenForm(false);
          return response;
        }
      } else {
        sendData = {
          ...sendData,
          image: [
            ...(informationUpload?.length > 0
              ? informationUpload[0]?.image
              : []),
            {
              file: file?.file,
              typeInstruction,
              title,
              description,
              duration,
              publish: isPublished,
              index: indexNumber,
            },
          ],
          // createBy: JSON.parse(createdBy),
          createBy: createdBy,
        };
        const response = await postDataInformationUpload(sendData);
        console.log("res", response);
        if (response.status === "OK") {
          setInformationUpload([sendData]);
          setOpenForm(false);
          return response;
        }
      }
    } else {
      console.log("sendData", sendData);
      console.log("file", file);
      if (informationUpload.length > 0) {
        sendData = { ...sendData, video: file };
        return putDataInformationUpload(informationUpload[0]?._id, sendData);
      } else {
        sendData = {
          ...sendData,
          video: file,
          // duration,
          createBy: createdBy,
        };
        return postDataInformationUpload(sendData);
      }
    }
  };

  const updateDataInformationUpload = async (_id, dataEdit, type) => {
    if (type === "image") {
      const data = { image: dataEdit };
      return putDataInformationUpload(_id, data);
    } else {
      const data = { video: dataEdit };
      return putDataInformationUpload(_id, data);
    }
  };

  const handleOpenEdit = (item) => {
    setAction("edit");
    setTitle(item?.title);
    setDuration(item?.duration);
    setIndexNumber(item?.index);
    setDescription(item?.description);
    setTypeInstruction(item?.typeInstruction);
    setIsPublished(item?.publish);
    setOpenForm(true);
  };

  const handleSelect = (data) => {
    setSelectedData(data);
    setOpenDialog(true);
    console.log(data);
  };

  const handleClose = () => {
    setOpenDialog(false);
    setSelectedData({});
  };

  const handleChangeTypeMedia = (e) => {
    const value = e.target.value;
    setTypeInstruction(value);
    setTitle("");
    setDuration(0);
    setIndexNumber(0);
    setDescription("");
  };

  const controlProps = (item) => ({
    checked: typeInstruction === item,
    onChange: handleChangeTypeMedia,
    value: item,
    name: "type-media",
    inputProps: { "aria-label": item },
  });

  return {
    getDataInformationUpload,
    getDataInformationUploadV2,
    submitDataInformationUpload,
    handleOpenEdit,
    openForm,
    setOpenForm,
    controlProps,
    title,
    setTitle,
    duration,
    indexNumber,
    setIndexNumber,
    setDuration,
    description,
    setDescription,
    date,
    setAction,
    action,
    setTypeInstruction,
    typeInstruction,
    setOpenSnackbar,
    openSnackbar,
    informationUpload,
    setInformationUpload,
    handleSelect,
    selectedData,
    openDialog,
    handleClose,
    updateDataInformationUpload,
    isPublished,
    setIsPublished,
  };
}
