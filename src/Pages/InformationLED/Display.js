import { Box, Button, Grid, Stack, Typography } from "@mui/material";
import StaticVar from "Config/StaticVar";
import UseDailyWork from "Hooks/DailyWork/useDailyWork";
import useInformationUpload from "Hooks/InformationUpload/useInformationUpload";
import { useEffect, useMemo, useRef, useState } from "react";
import Stories from "react-insta-stories";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { CarouselInformations } from "./Styles";

// assets
import greenTrainLeft from "../../Assets/Images/green-train-left.png";
import greenTrainRight from "../../Assets/Images/green-train-right.png";
import redTrainLeft from "../../Assets/Images/red-train-left.png";
import redTrainRight from "../../Assets/Images/red-train-right.png";

const DisplayLED = () => {
  const { informationUpload, getDataInformationUploadV2 } =
    useInformationUpload();
  const [activeImg, setActiveImg] = useState(0);
  const [activeLangsir, setActiveLangsir] = useState(0);
  const [currentId, setCurrentId] = useState(0);

  const {
    dataScheduleTrainDriver,
    fetchDataDailyWork,
    dataScheduleTrainDriverLangsir,
    timeTrain,
  } = UseDailyWork();

  const key = localStorage.getItem("access_token");

  const getDataInformation = async () => {
    const params = { status: "publish" };
    const response = await getDataInformationUploadV2(params);
    if (response.status === "OK" && response.result.length > 0) {
      return response.result;
    }
  };

  const start = true;
  const tick = useRef(); // <-- React ref

  const vidList = useMemo(() => {
    const result = informationUpload[0]?.video?.map((item) => {
      item.url = StaticVar.URL_API + "/" + item.file;
      item.type = "video";
      return item;
    });

    return result;
  }, [informationUpload[0]?.video]);

  useEffect(() => {
    if (key) {
      if (start) {
        tick.current = setInterval(async () => {
          fetchDataDailyWork(key);
        }, 1000);
      } else {
        clearInterval(tick.current); // <-- access tick ref current value
      }

      return () => {
        clearInterval(tick.current);
      }; // <-- clear on unmount!
    }
  }, [start]);

  // const refVid = useRef([])

  var dataScheduleSplit = [];
  function splitIntoChunk(arr, chunk) {
    for (var i = 0; i < arr.length; i += chunk) {
      let tempArray;
      tempArray = arr.slice(i, i + chunk);
      dataScheduleSplit = [...dataScheduleSplit, tempArray];
    }
  }
  const chunk = 4;
  splitIntoChunk(
    dataScheduleTrainDriver.length > 0 ? dataScheduleTrainDriver : [],
    chunk
  );

  function splitNameAbbrevation(name) {
    var splitName = name.split(" ");
    if (splitName.length >= 2) {
      for (let i = 1; i < splitName.length - 1; i++) {
        splitName[i] = splitName[i].charAt(0) + ".";
      }
    }
    return splitName.join(" ");
  }

  const displayVideo =
    informationUpload.length > 0 &&
    Array.isArray(vidList) &&
    vidList.length > 0;

  useEffect(() => {
    getDataInformation();
  }, []);

  // const videoStorieComp = document.getElementsByTagName("video")[0];
  // const playButton = document.getElementById("playBtn");
  // if (videoStorieComp) {
  //   playButton.addEventListener("click", function () {
  //     videoStorieComp.play();
  //     videoStorieComp.muted = true;
  //   });
  //   // videoStorieComp.setAttribute("muted", "");
  //   // videoStorieComp.oncanplay = function () {
  //   //   videoStorieComp.muted = true;
  //   //   videoStorieComp.play = true;
  //   // };
  // }
  // if (videoStorieComp) {
  // }

  return (
    <>
      <Button sx={{ display: "none" }} id="playBtn" />
      {key ? (
        <>
          <div
            style={{
              paddingTop: 25,
            }}
          >
            <Box>
              <Grid container spacing={1}>
                <Grid item xs={5}>
                  <Grid container spacing={1} sx={{ mt: -3 }}>
                    <Grid item xs={12}>
                      <Typography
                        sx={{
                          backgroundColor: "#464748",
                          color: "white",
                          fontWeight: "normal",
                          textTransform: "uppercase",
                          // '@media only screen and (min-width: 5000px': {
                          //   fontSize: window.screen.width / 80,
                          // },
                        }}
                        align="center"
                      >
                        Informasi
                      </Typography>
                      <Box sx={{ backgroundColor: "#555555" }}>
                        <Carousel
                          autoPlay
                          infiniteLoop
                          interval={
                            informationUpload[0]?.image[activeImg]?.duration *
                            1000
                          }
                          // animationHandler={'fade'}
                          // axis={'vertical'}
                          selectedItem={activeImg}
                          onChange={setActiveImg}
                          showArrows={false}
                          showStatus={false}
                          showIndicators={false}
                          showThumbs={false}
                        >
                          {informationUpload.length > 0 &&
                            informationUpload[0].image.map((item, index) => (
                              <CarouselInformations key={index}>
                                <div>
                                  <img
                                    src={StaticVar.URL_API + "/" + item.file}
                                    alt={item.file}
                                    height="100%"
                                    style={{
                                      objectFit: "contain",
                                      objectPosition: "top",
                                    }}
                                  />
                                  {item.typeInstruction === "Text" ? (
                                    <Box
                                      justifyContent="center"
                                      flexDirection="column"
                                      sx={{
                                        position: "absolute",
                                        top: 10,
                                        marginLeft: "auto",
                                        marginRight: "auto",
                                        left: 0,
                                        right: 0,
                                      }}
                                    >
                                      <Typography>{item.title}</Typography>
                                      <div
                                        dangerouslySetInnerHTML={{
                                          __html: item.description,
                                        }}
                                      ></div>
                                    </Box>
                                  ) : (
                                    <Box
                                      sx={{
                                        position: "absolute",
                                        bottom: 10,
                                        marginLeft: "auto",
                                        marginRight: "auto",
                                        left: 0,
                                        right: 0,
                                      }}
                                    >
                                      <div
                                        dangerouslySetInnerHTML={{
                                          __html: item.description,
                                        }}
                                      ></div>
                                    </Box>
                                  )}
                                </div>
                              </CarouselInformations>
                            ))}
                        </Carousel>
                      </Box>
                    </Grid>
                    <Grid item xs={12} sx={{ height: "50px" }}>
                      <Typography
                        sx={{
                          backgroundColor: "#464748",
                          color: "white",
                          fontWeight: "normal",
                          textTransform: "uppercase",
                          // '@media only screen and (min-width: 5000px': {
                          //   fontSize: window.screen.width / 80,
                          // },
                        }}
                        align="center"
                      >
                        Materi Refreshing{" "}
                      </Typography>
                      <Box sx={{ backgroundColor: "#555555" }}>
                        {displayVideo && (
                          <Stories
                            loop
                            keyboardNavigation
                            stories={vidList}
                            width="100%"
                            height={300}
                            currentIndex={currentId}
                            defaultInterval={3000}
                            onStoryEnd={(s, st) => {
                              console.log("story ended", s, st);
                              setCurrentId((currentId) => currentId + 1);
                            }}
                            onAllStoriesEnd={(s, st) => {
                              console.log("all stories ended", s, st);
                              setCurrentId((currentId) => 0);
                            }}
                            onStoryStart={(s, st) => {
                              console.log("story started", s, st);
                              setCurrentId((currentId) => currentId + 1 - 1);
                            }}
                            // progressContainerStyles={{ backgroundColor:'red' }}
                          />
                        )}
                      </Box>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={7}>
                  <Grid container sx={{ mt: 1 }}>
                    <Grid item xs={12}>
                      <Box sx={{ position: "relative" }}>
                        <Box
                          sx={{
                            width: "100%",
                            height: 3,
                            backgroundColor: "#000000",
                            position: "absolute",
                            top: 13,
                          }}
                        />
                        <Box
                          sx={{
                            width: 125,
                            height: 80,
                            top: 15,
                            left: 80,
                            borderBottom: "4px solid #000",
                            transform: "rotate(65deg)",
                            position: "absolute",
                          }}
                        />
                        <Box
                          sx={{
                            width: 125,
                            height: 80,
                            top: 15,
                            right: 10,
                            borderBottom: "4px solid #000",
                            transform: "rotate(65deg)",
                            position: "absolute",
                          }}
                        />
                      </Box>
                    </Grid>
                    {/* Perjalanan Genap */}
                    <Grid item xs={12}>
                      <Grid container columns={12}>
                        <Grid item xs={0.5}></Grid>
                        <Grid item xs={1} sx={{ justifyContent: "center" }}>
                          {timeTrain.filter(
                            (x) =>
                              x.odd == true &&
                              x._id === "62d115995be964c7a53d990c" &&
                              x.status === "Selesai"
                          ).length > 0 && (
                            <Box
                              sx={{
                                width: "100%",
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                textTransform: "uppercase",
                                flexDirection: "column",
                                mt: -3.2,
                              }}
                            >
                              <Typography
                                variant="body2"
                                sx={{
                                  fontSize: 12,
                                  fontWeight: 600,
                                  mt: 2,
                                  ml: -8,
                                  lineHeight: 0,
                                }}
                              >
                                {
                                  timeTrain.filter(
                                    (x) =>
                                      x.odd == true &&
                                      x._id === "62d115995be964c7a53d990c" &&
                                      x.status === "Selesai"
                                  )[0]?.trainNumber
                                }
                                {timeTrain.filter(
                                  (x) =>
                                    x.odd == true &&
                                    x._id === "62d115995be964c7a53d990c" &&
                                    x.status === "Selesai"
                                )[0]?.lrv.length > 0 ? (
                                  <>
                                    (
                                    {timeTrain
                                      .filter(
                                        (x) =>
                                          x.odd == true &&
                                          x._id ===
                                            "62d115995be964c7a53d990c" &&
                                          x.status === "Selesai"
                                      )[0]
                                      ?.lrv.map((item, i) => (
                                        <span
                                          key={i}
                                          style={{
                                            fontSize: 13,
                                            fontWeight: 600,
                                          }}
                                        >
                                          {(i ? ", " : "") + item}
                                        </span>
                                      ))}
                                    )
                                  </>
                                ) : (
                                  ""
                                )}
                              </Typography>
                              {timeTrain.filter(
                                (x) =>
                                  x.odd == true &&
                                  x._id === "62d115995be964c7a53d990c" &&
                                  x.status === "Selesai"
                              ).length > 0 ? (
                                <img
                                  src={redTrainLeft}
                                  alt="Train"
                                  width="50px"
                                  style={{ zIndex: 1, marginLeft: -70 }}
                                />
                              ) : (
                                <div style={{ height: 50 }}></div>
                              )}
                            </Box>
                          )}
                          {timeTrain.filter(
                            (x) =>
                              x.odd == false &&
                              x._id === "62d115995be964c7a53d990c" &&
                              x.status === "Selesai"
                          ).length > 0 && (
                            <Box
                              sx={{
                                width: "100%",
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                textTransform: "uppercase",
                                flexDirection: "column",
                                mt: -3.2,
                              }}
                            >
                              <Typography
                                variant="body2"
                                sx={{
                                  fontSize: 12,
                                  fontWeight: 600,
                                  mt: 2,
                                  ml: -8,
                                  lineHeight: 0,
                                }}
                              >
                                {
                                  timeTrain.filter(
                                    (x) =>
                                      x.odd == false &&
                                      x._id === "62d115995be964c7a53d990c" &&
                                      x.status === "Selesai"
                                  )[0]?.trainNumber
                                }
                                {timeTrain.filter(
                                  (x) =>
                                    x.odd == false &&
                                    x._id === "62d115995be964c7a53d990c" &&
                                    x.status === "Selesai"
                                )[0]?.lrv.length > 0 ? (
                                  <>
                                    (
                                    {timeTrain
                                      .filter(
                                        (x) =>
                                          x.odd == false &&
                                          x._id ===
                                            "62d115995be964c7a53d990c" &&
                                          x.status === "Selesai"
                                      )[0]
                                      ?.lrv.map((item, i) => (
                                        <span
                                          key={i}
                                          style={{
                                            fontSize: 13,
                                            fontWeight: 600,
                                          }}
                                        >
                                          {(i ? ", " : "") + item}
                                        </span>
                                      ))}
                                    )
                                  </>
                                ) : (
                                  ""
                                )}
                              </Typography>
                              {timeTrain.filter(
                                (x) =>
                                  x.odd == false &&
                                  x._id === "62d115995be964c7a53d990c" &&
                                  x.status === "Selesai"
                              ).length > 0 ? (
                                <img
                                  src={redTrainRight}
                                  alt="Train"
                                  width="50px"
                                  style={{ zIndex: 1, marginLeft: -70 }}
                                />
                              ) : (
                                <div style={{ height: 50 }}></div>
                              )}
                            </Box>
                          )}
                        </Grid>
                        <Grid item xs={1}>
                          <Box
                            sx={{
                              width: "100%",
                              display: "flex",
                              justifyContent: "center",
                              alignItems: "center",
                              textTransform: "uppercase",
                              flexDirection: "column",
                              mt: -3.2,
                            }}
                          >
                            {/* <div
                              style={{
                                position: 'absolute',
                                top: 45,
                                zIndex: 2,
                              }}> */}
                            <Typography
                              variant="body2"
                              sx={{
                                fontSize: 12,
                                fontWeight: 600,
                                mt: 2,
                                ml: 5.5,
                                lineHeight: 0,
                              }}
                            >
                              {
                                timeTrain.filter(
                                  (x) =>
                                    x.odd == true &&
                                    x._id === "62d115ba5be964c7a53d990f" &&
                                    x.status === "Bertugas"
                                )[0]?.trainNumber
                              }
                              {timeTrain.filter(
                                (x) =>
                                  x.odd == true &&
                                  x._id === "62d115ba5be964c7a53d990f" &&
                                  x.status === "Bertugas"
                              )[0]?.lrv.length > 0 ? (
                                <>
                                  (
                                  {timeTrain
                                    .filter(
                                      (x) =>
                                        x.odd == true &&
                                        x._id === "62d115ba5be964c7a53d990f" &&
                                        x.status === "Bertugas"
                                    )[0]
                                    ?.lrv.map((item, i) => (
                                      <span
                                        key={i}
                                        style={{
                                          fontSize: 13,
                                          fontWeight: 600,
                                        }}
                                      >
                                        {(i ? ", " : "") + item}
                                      </span>
                                    ))}
                                  )
                                </>
                              ) : (
                                ""
                              )}
                            </Typography>
                            {timeTrain.filter(
                              (x) =>
                                x.odd == true &&
                                x._id === "62d115ba5be964c7a53d990f" &&
                                x.status === "Bertugas"
                            ).length > 0 ? (
                              <img
                                src={greenTrainLeft}
                                alt="Train"
                                width="50px"
                                style={{ zIndex: 1, marginLeft: 30 }}
                              />
                            ) : (
                              <div style={{ height: 40 }}></div>
                            )}
                            {/* </div> */}
                          </Box>
                        </Grid>
                        <Grid item xs={1}>
                          <Box
                            sx={{
                              width: "100%",
                              display: "flex",
                              justifyContent: "center",
                              alignItems: "center",
                              textTransform: "uppercase",
                              flexDirection: "column",
                              mt: -3.2,
                            }}
                          >
                            <Typography
                              variant="body2"
                              sx={{
                                fontSize: 12,
                                fontWeight: 600,
                                mt: 2,
                                lineHeight: 0,
                              }}
                            >
                              {
                                timeTrain.filter(
                                  (x) =>
                                    x.odd == true &&
                                    x._id === "62d115ba5be964c7a53d990f" &&
                                    x.status === "Selesai"
                                )[0]?.trainNumber
                              }
                              {timeTrain.filter(
                                (x) =>
                                  x.odd == true &&
                                  x._id === "62d115ba5be964c7a53d990f" &&
                                  x.status === "Selesai"
                              )[0]?.lrv.length > 0 ? (
                                <>
                                  (
                                  {timeTrain
                                    .filter(
                                      (x) =>
                                        x.odd == true &&
                                        x._id === "62d115ba5be964c7a53d990f" &&
                                        x.status === "Selesai"
                                    )[0]
                                    ?.lrv.map((item, i) => (
                                      <span
                                        key={i}
                                        style={{
                                          fontSize: 13,
                                          fontWeight: 600,
                                        }}
                                      >
                                        {(i ? ", " : "") + item}
                                      </span>
                                    ))}
                                  )
                                </>
                              ) : (
                                ""
                              )}
                            </Typography>
                            {timeTrain.filter(
                              (x) =>
                                x.odd == true &&
                                x._id === "62d115ba5be964c7a53d990f" &&
                                x.status === "Selesai"
                            ).length > 0 ? (
                              <img
                                src={redTrainLeft}
                                alt="Train"
                                width="50px"
                                style={{ zIndex: 1 }}
                              />
                            ) : (
                              <div style={{ height: 50 }}></div>
                            )}
                          </Box>
                        </Grid>
                        <Grid item xs={1}>
                          <Box
                            sx={{
                              width: "100%",
                              display: "flex",
                              justifyContent: "center",
                              alignItems: "center",
                              textTransform: "uppercase",
                              flexDirection: "column",
                              mt: -3.2,
                            }}
                          >
                            <Typography
                              variant="body2"
                              sx={{
                                fontSize: 12,
                                fontWeight: 600,
                                mt: 2,
                                lineHeight: 0,
                              }}
                            >
                              {
                                timeTrain.filter(
                                  (x) =>
                                    x.odd == true &&
                                    x._id === "62d115db5be964c7a53d9912" &&
                                    x.status === "Bertugas"
                                )[0]?.trainNumber
                              }
                              {timeTrain.filter(
                                (x) =>
                                  x.odd == true &&
                                  x._id === "62d115db5be964c7a53d9912" &&
                                  x.status === "Bertugas"
                              )[0]?.lrv.length > 0 ? (
                                <>
                                  (
                                  {timeTrain
                                    .filter(
                                      (x) =>
                                        x.odd == true &&
                                        x._id === "62d115db5be964c7a53d9912" &&
                                        x.status === "Bertugas"
                                    )[0]
                                    ?.lrv.map((item, i) => (
                                      <span
                                        key={i}
                                        style={{
                                          fontSize: 13,
                                          fontWeight: 600,
                                        }}
                                      >
                                        {(i ? ", " : "") + item}
                                      </span>
                                    ))}
                                  )
                                </>
                              ) : (
                                ""
                              )}
                            </Typography>
                            {timeTrain.filter(
                              (x) =>
                                x.odd == true &&
                                x._id === "62d115db5be964c7a53d9912" &&
                                x.status === "Bertugas"
                            ).length > 0 ? (
                              <img
                                src={greenTrainLeft}
                                alt="Train"
                                width="50px"
                                style={{ zIndex: 1 }}
                              />
                            ) : (
                              <div style={{ height: 40 }}></div>
                            )}
                          </Box>
                        </Grid>
                        <Grid item xs={1}>
                          <Box
                            sx={{
                              width: "100%",
                              display: "flex",
                              justifyContent: "center",
                              alignItems: "center",
                              textTransform: "uppercase",
                              flexDirection: "column",
                              mt: -3.2,
                            }}
                          >
                            <Typography
                              variant="body2"
                              sx={{
                                fontSize: 12,
                                fontWeight: 600,
                                mt: 2,
                                lineHeight: 0,
                              }}
                            >
                              {
                                timeTrain.filter(
                                  (x) =>
                                    x.odd == true &&
                                    x._id === "62d115db5be964c7a53d9912" &&
                                    x.status === "Selesai"
                                )[0]?.trainNumber
                              }
                              {timeTrain.filter(
                                (x) =>
                                  x.odd == true &&
                                  x._id === "62d115db5be964c7a53d9912" &&
                                  x.status === "Selesai"
                              )[0]?.lrv.length > 0 ? (
                                <>
                                  (
                                  {timeTrain
                                    .filter(
                                      (x) =>
                                        x.odd == true &&
                                        x._id === "62d115db5be964c7a53d9912" &&
                                        x.status === "Selesai"
                                    )[0]
                                    ?.lrv.map((item, i) => (
                                      <span
                                        key={i}
                                        style={{
                                          fontSize: 13,
                                          fontWeight: 600,
                                        }}
                                      >
                                        {(i ? ", " : "") + item}
                                      </span>
                                    ))}
                                  )
                                </>
                              ) : (
                                ""
                              )}
                            </Typography>
                            {timeTrain.filter(
                              (x) =>
                                x.odd == true &&
                                x._id === "62d115db5be964c7a53d9912" &&
                                x.status === "Selesai"
                            ).length > 0 ? (
                              <img
                                src={redTrainLeft}
                                alt="Train"
                                width="50px"
                                style={{ zIndex: 1 }}
                              />
                            ) : (
                              <div style={{ height: 50 }}></div>
                            )}
                          </Box>
                        </Grid>
                        <Grid item xs={1}>
                          <Box
                            sx={{
                              width: "100%",
                              display: "flex",
                              justifyContent: "center",
                              alignItems: "center",
                              textTransform: "uppercase",
                              flexDirection: "column",
                              mt: -3.2,
                            }}
                          >
                            <Typography
                              variant="body2"
                              sx={{
                                fontSize: 12,
                                fontWeight: 600,
                                mt: 2,
                                lineHeight: 0,
                              }}
                            >
                              {
                                timeTrain.filter(
                                  (x) =>
                                    x.odd == true &&
                                    x._id === "62d115f85be964c7a53d9915" &&
                                    x.status === "Bertugas"
                                )[0]?.trainNumber
                              }
                              {timeTrain.filter(
                                (x) =>
                                  x.odd == true &&
                                  x._id === "62d115f85be964c7a53d9915" &&
                                  x.status === "Bertugas"
                              )[0]?.lrv.length > 0 ? (
                                <>
                                  (
                                  {timeTrain
                                    .filter(
                                      (x) =>
                                        x.odd == true &&
                                        x._id === "62d115f85be964c7a53d9915" &&
                                        x.status === "Bertugas"
                                    )[0]
                                    ?.lrv.map((item, i) => (
                                      <span
                                        key={i}
                                        style={{
                                          fontSize: 13,
                                          fontWeight: 600,
                                        }}
                                      >
                                        {(i ? ", " : "") + item}
                                      </span>
                                    ))}
                                  )
                                </>
                              ) : (
                                ""
                              )}
                            </Typography>
                            {timeTrain.filter(
                              (x) =>
                                x.odd == true &&
                                x._id === "62d115f85be964c7a53d9915" &&
                                x.status === "Bertugas"
                            ).length > 0 ? (
                              <img
                                src={greenTrainLeft}
                                alt="Train"
                                width="50px"
                                style={{ zIndex: 1 }}
                              />
                            ) : (
                              <div style={{ height: 40 }}></div>
                            )}
                          </Box>
                        </Grid>
                        <Grid item xs={1}>
                          <Box
                            sx={{
                              width: "100%",
                              display: "flex",
                              justifyContent: "center",
                              alignItems: "center",
                              textTransform: "uppercase",
                              flexDirection: "column",
                              mt: -3.2,
                            }}
                          >
                            <Typography
                              variant="body2"
                              sx={{
                                fontSize: 12,
                                fontWeight: 600,
                                mt: 2,
                                lineHeight: 0,
                              }}
                            >
                              {
                                timeTrain.filter(
                                  (x) =>
                                    x.odd == true &&
                                    x._id === "62d115f85be964c7a53d9915" &&
                                    x.status === "Selesai"
                                )[0]?.trainNumber
                              }
                              {timeTrain.filter(
                                (x) =>
                                  x.odd == true &&
                                  x._id === "62d115f85be964c7a53d9915" &&
                                  x.status === "Selesai"
                              )[0]?.lrv.length > 0 ? (
                                <>
                                  (
                                  {timeTrain
                                    .filter(
                                      (x) =>
                                        x.odd == true &&
                                        x._id === "62d115f85be964c7a53d9915" &&
                                        x.status === "Selesai"
                                    )[0]
                                    ?.lrv.map((item, i) => (
                                      <span
                                        key={i}
                                        style={{
                                          fontSize: 13,
                                          fontWeight: 600,
                                        }}
                                      >
                                        {(i ? ", " : "") + item}
                                      </span>
                                    ))}
                                  )
                                </>
                              ) : (
                                ""
                              )}
                            </Typography>
                            {timeTrain.filter(
                              (x) =>
                                x.odd == true &&
                                x._id === "62d115f85be964c7a53d9915" &&
                                x.status === "Selesai"
                            ).length > 0 ? (
                              <img
                                src={redTrainLeft}
                                alt="Train"
                                width="50px"
                                style={{ zIndex: 1 }}
                              />
                            ) : (
                              <div style={{ height: 50 }}></div>
                            )}
                          </Box>
                        </Grid>
                        <Grid item xs={1}>
                          <Box
                            sx={{
                              width: "100%",
                              display: "flex",
                              justifyContent: "center",
                              alignItems: "center",
                              textTransform: "uppercase",
                              flexDirection: "column",
                              mt: -3.2,
                            }}
                          >
                            <Typography
                              variant="body2"
                              sx={{
                                fontSize: 12,
                                fontWeight: 600,
                                mt: 2,
                                lineHeight: 0,
                              }}
                            >
                              {
                                timeTrain.filter(
                                  (x) =>
                                    x.odd == true &&
                                    x._id === "62d1161e5be964c7a53d9918" &&
                                    x.status === "Bertugas"
                                )[0]?.trainNumber
                              }
                              {timeTrain.filter(
                                (x) =>
                                  x.odd == true &&
                                  x._id === "62d1161e5be964c7a53d9918" &&
                                  x.status === "Bertugas"
                              )[0]?.lrv.length > 0 ? (
                                <>
                                  (
                                  {timeTrain
                                    .filter(
                                      (x) =>
                                        x.odd == true &&
                                        x._id === "62d1161e5be964c7a53d9918" &&
                                        x.status === "Bertugas"
                                    )[0]
                                    ?.lrv.map((item, i) => (
                                      <span
                                        key={i}
                                        style={{
                                          fontSize: 13,
                                          fontWeight: 600,
                                        }}
                                      >
                                        {(i ? ", " : "") + item}
                                      </span>
                                    ))}
                                  )
                                </>
                              ) : (
                                ""
                              )}
                            </Typography>
                            {timeTrain.filter(
                              (x) =>
                                x.odd == true &&
                                x._id === "62d1161e5be964c7a53d9918" &&
                                x.status === "Bertugas"
                            ).length > 0 ? (
                              <img
                                src={greenTrainLeft}
                                alt="Train"
                                width="50px"
                                style={{ zIndex: 1 }}
                              />
                            ) : (
                              <div style={{ height: 40 }}></div>
                            )}
                          </Box>
                        </Grid>
                        <Grid item xs={1}>
                          <Box
                            sx={{
                              width: "100%",
                              display: "flex",
                              justifyContent: "center",
                              alignItems: "center",
                              textTransform: "uppercase",
                              flexDirection: "column",
                              mt: -3.2,
                            }}
                          >
                            <Typography
                              variant="body2"
                              sx={{
                                fontSize: 12,
                                fontWeight: 600,
                                mt: 2,
                                lineHeight: 0,
                              }}
                            >
                              {
                                timeTrain.filter(
                                  (x) =>
                                    x.odd == true &&
                                    x._id === "62d1161e5be964c7a53d9918" &&
                                    x.status === "Selesai"
                                )[0]?.trainNumber
                              }
                              {timeTrain.filter(
                                (x) =>
                                  x.odd == true &&
                                  x._id === "62d1161e5be964c7a53d9918" &&
                                  x.status === "Selesai"
                              )[0]?.lrv.length > 0 ? (
                                <>
                                  (
                                  {timeTrain
                                    .filter(
                                      (x) =>
                                        x.odd == true &&
                                        x._id === "62d1161e5be964c7a53d9918" &&
                                        x.status === "Selesai"
                                    )[0]
                                    ?.lrv.map((item, i) => (
                                      <span
                                        key={i}
                                        style={{
                                          fontSize: 13,
                                          fontWeight: 600,
                                        }}
                                      >
                                        {(i ? ", " : "") + item}
                                      </span>
                                    ))}
                                  )
                                </>
                              ) : (
                                ""
                              )}
                            </Typography>
                            {timeTrain.filter(
                              (x) =>
                                x.odd == true &&
                                x._id === "62d1161e5be964c7a53d9918" &&
                                x.status === "Selesai"
                            ).length > 0 ? (
                              <img
                                src={redTrainLeft}
                                alt="Train"
                                width="50px"
                                style={{ zIndex: 1 }}
                              />
                            ) : (
                              <div style={{ height: 50 }}></div>
                            )}
                          </Box>
                        </Grid>
                        <Grid item xs={1}>
                          <Box
                            sx={{
                              width: "100%",
                              display: "flex",
                              justifyContent: "center",
                              alignItems: "center",
                              textTransform: "uppercase",
                              flexDirection: "column",
                              mt: -3.2,
                            }}
                          >
                            <Typography
                              variant="body2"
                              sx={{
                                fontSize: 12,
                                fontWeight: 600,
                                mt: 2,
                                lineHeight: 0,
                                marginRight: 4,
                              }}
                            >
                              {
                                timeTrain.filter(
                                  (x) =>
                                    x.odd == true &&
                                    x._id === "62d1163e5be964c7a53d991b" &&
                                    x.status === "Bertugas"
                                )[0]?.trainNumber
                              }
                              {timeTrain.filter(
                                (x) =>
                                  x.odd == true &&
                                  x._id === "62d1163e5be964c7a53d991b" &&
                                  x.status === "Bertugas"
                              )[0]?.lrv.length > 0 ? (
                                <>
                                  (
                                  {timeTrain
                                    .filter(
                                      (x) =>
                                        x.odd == true &&
                                        x._id === "62d1163e5be964c7a53d991b" &&
                                        x.status === "Bertugas"
                                    )[0]
                                    ?.lrv.map((item, i) => (
                                      <span
                                        key={i}
                                        style={{
                                          fontSize: 13,
                                          fontWeight: 600,
                                        }}
                                      >
                                        {(i ? ", " : "") + item}
                                      </span>
                                    ))}
                                  )
                                </>
                              ) : (
                                ""
                              )}
                            </Typography>
                            {timeTrain.filter(
                              (x) =>
                                x.odd == true &&
                                x._id === "62d1163e5be964c7a53d991b" &&
                                x.status === "Bertugas"
                            ).length > 0 ? (
                              <img
                                src={greenTrainLeft}
                                alt="Train"
                                width="50px"
                                style={{ zIndex: 1, marginLeft: -35 }}
                              />
                            ) : (
                              <div style={{ height: 40 }}></div>
                            )}
                          </Box>
                        </Grid>
                        <Grid item xs={1}>
                          {timeTrain.filter(
                            (x) =>
                              x.odd == true &&
                              x._id === "62d1163e5be964c7a53d991b" &&
                              x.status === "Selesai"
                          ).length > 0 ? (
                            <Box
                              sx={{
                                width: "100%",
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                textTransform: "uppercase",
                                flexDirection: "column",
                                mt: -3.2,
                              }}
                            >
                              <Typography
                                variant="body2"
                                sx={{
                                  fontSize: 12,
                                  fontWeight: 600,
                                  mt: 2,
                                  mr: -9,
                                  lineHeight: 0,
                                }}
                              >
                                {
                                  timeTrain.filter(
                                    (x) =>
                                      x.odd == true &&
                                      x._id === "62d1163e5be964c7a53d991b" &&
                                      x.status === "Selesai"
                                  )[0]?.trainNumber
                                }
                                {timeTrain.filter(
                                  (x) =>
                                    x.odd == true &&
                                    x._id === "62d1163e5be964c7a53d991b" &&
                                    x.status === "Selesai"
                                )[0]?.lrv.length > 0 ? (
                                  <>
                                    (
                                    {timeTrain
                                      .filter(
                                        (x) =>
                                          x.odd == true &&
                                          x._id ===
                                            "62d1163e5be964c7a53d991b" &&
                                          x.status === "Selesai"
                                      )[0]
                                      ?.lrv.map((item, i) => (
                                        <span
                                          key={i}
                                          style={{
                                            fontSize: 13,
                                            fontWeight: 600,
                                          }}
                                        >
                                          {(i ? ", " : "") + item}
                                        </span>
                                      ))}
                                    )
                                  </>
                                ) : (
                                  ""
                                )}
                              </Typography>
                              {timeTrain.filter(
                                (x) =>
                                  x.odd == true &&
                                  x._id === "62d1163e5be964c7a53d991b" &&
                                  x.status === "Selesai"
                              ).length > 0 ? (
                                <img
                                  src={redTrainLeft}
                                  alt="Train"
                                  width="50px"
                                  style={{ zIndex: 1, marginRight: -70 }}
                                />
                              ) : (
                                <div style={{ height: 50 }}></div>
                              )}
                            </Box>
                          ) : (
                            timeTrain.filter(
                              (x) =>
                                x.odd == false &&
                                x._id === "62d1163e5be964c7a53d991b" &&
                                x.status === "Selesai"
                            ).length > 0 && (
                              <Box
                                sx={{
                                  width: "100%",
                                  display: "flex",
                                  justifyContent: "center",
                                  alignItems: "center",
                                  textTransform: "uppercase",
                                  flexDirection: "column",
                                  mt: -3.2,
                                }}
                              >
                                <Typography
                                  variant="body2"
                                  sx={{
                                    fontSize: 12,
                                    fontWeight: 600,
                                    mt: 2,
                                    mr: -8,
                                    lineHeight: 0,
                                  }}
                                >
                                  {
                                    timeTrain.filter(
                                      (x) =>
                                        x.odd == false &&
                                        x._id === "62d1163e5be964c7a53d991b" &&
                                        x.status === "Selesai"
                                    )[0]?.trainNumber
                                  }
                                  {timeTrain.filter(
                                    (x) =>
                                      x.odd == false &&
                                      x._id === "62d1163e5be964c7a53d991b" &&
                                      x.status === "Selesai"
                                  )[0]?.lrv.length > 0 ? (
                                    <>
                                      (
                                      {timeTrain
                                        .filter(
                                          (x) =>
                                            x.odd == false &&
                                            x._id ===
                                              "62d1163e5be964c7a53d991b" &&
                                            x.status === "Selesai"
                                        )[0]
                                        ?.lrv.map((item, i) => (
                                          <span
                                            key={i}
                                            style={{
                                              fontSize: 13,
                                              fontWeight: 600,
                                            }}
                                          >
                                            {(i ? ", " : "") + item}
                                          </span>
                                        ))}
                                      )
                                    </>
                                  ) : (
                                    ""
                                  )}
                                </Typography>
                                {timeTrain.filter(
                                  (x) =>
                                    x.odd == false &&
                                    x._id === "62d1163e5be964c7a53d991b" &&
                                    x.status === "Selesai"
                                ).length > 0 ? (
                                  <img
                                    src={redTrainRight}
                                    alt="Train"
                                    width="50px"
                                    style={{ zIndex: 1, marginRight: -70 }}
                                  />
                                ) : (
                                  <div style={{ height: 50 }}></div>
                                )}
                              </Box>
                            )
                          )}
                        </Grid>
                        <Grid item xs={0.5}></Grid>
                      </Grid>
                    </Grid>
                    <Grid item xs={12}>
                      <Grid container sx={{ mx: "auto", py: 4 }}>
                        <Grid item xs={0.5}></Grid>
                        <Grid
                          item
                          xs={1}
                          sx={{
                            position: "relative",
                            display: "flex",
                            alignItems: "center",
                          }}
                        >
                          <Box
                            sx={{
                              position: "absolute",
                              left: -35,
                              display: "flex",
                              flexDirection: "column",
                              justifyContent: "center",
                              textTransform: "uppercase",
                              alignItems: "center",
                              px: 2,
                              py: 1,
                              backgroundColor: "#EDBB00",
                              boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
                              borderRadius: "16px",
                              width: "100%",
                            }}
                          >
                            <Typography>VLD</Typography>
                            <Typography>5+806</Typography>
                          </Box>
                        </Grid>
                        <Grid item xs={1}></Grid>
                        <Grid
                          item
                          xs={1}
                          sx={{
                            position: "relative",
                            display: "flex",
                            alignItems: "center",
                          }}
                        >
                          <Box
                            sx={{
                              position: "absolute",
                              left: 0,
                              display: "flex",
                              flexDirection: "column",
                              justifyContent: "center",
                              textTransform: "uppercase",
                              alignItems: "center",
                              px: 2,
                              py: 1,
                              backgroundColor: "#EDBB00",
                              boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
                              borderRadius: "16px",
                              width: "100%",
                            }}
                          >
                            <Typography>EQS</Typography>
                            <Typography>4+866</Typography>
                          </Box>
                        </Grid>
                        <Grid item xs={1}></Grid>
                        <Grid
                          item
                          xs={1}
                          sx={{
                            position: "relative",
                            display: "flex",
                            alignItems: "center",
                          }}
                        >
                          <Box
                            sx={{
                              position: "absolute",
                              left: 0,
                              display: "flex",
                              flexDirection: "column",
                              justifyContent: "center",
                              textTransform: "uppercase",
                              alignItems: "center",
                              px: 2,
                              py: 1,
                              backgroundColor: "#EDBB00",
                              boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
                              borderRadius: "16px",
                              width: "100%",
                            }}
                          >
                            <Typography>PLS</Typography>
                            <Typography>4+166</Typography>
                          </Box>
                        </Grid>
                        <Grid item xs={1}></Grid>
                        <Grid
                          item
                          xs={1}
                          sx={{
                            position: "relative",
                            display: "flex",
                            alignItems: "center",
                          }}
                        >
                          <Box
                            sx={{
                              position: "absolute",
                              left: 0,
                              display: "flex",
                              flexDirection: "column",
                              justifyContent: "center",
                              alignItems: "center",
                              textTransform: "uppercase",
                              px: 2,
                              py: 1,
                              backgroundColor: "#EDBB00",
                              boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
                              borderRadius: "16px",
                              width: "100%",
                            }}
                          >
                            <Typography>BLS</Typography>
                            <Typography>2+966</Typography>
                          </Box>
                        </Grid>
                        <Grid item xs={1}></Grid>
                        <Grid
                          item
                          xs={1}
                          sx={{
                            position: "relative",
                            display: "flex",
                            alignItems: "center",
                          }}
                        >
                          <Box
                            sx={{
                              position: "absolute",
                              left: 0,
                              display: "flex",
                              flexDirection: "column",
                              justifyContent: "center",
                              alignItems: "center",
                              textTransform: "uppercase",
                              px: 2,
                              py: 1,
                              backgroundColor: "#EDBB00",
                              boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
                              borderRadius: "16px",
                              width: "100%",
                            }}
                          >
                            <Typography>BLU</Typography>
                            <Typography>1+766</Typography>
                          </Box>
                        </Grid>
                        <Grid item xs={1}></Grid>
                        <Grid
                          item
                          xs={1}
                          sx={{
                            position: "relative",
                            display: "flex",
                            alignItems: "center",
                          }}
                        >
                          <Box
                            sx={{
                              position: "absolute",
                              right: -35,
                              display: "flex",
                              flexDirection: "column",
                              justifyContent: "center",
                              alignItems: "center",
                              textTransform: "uppercase",
                              px: 2,
                              py: 1,
                              backgroundColor: "#EDBB00",
                              boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
                              borderRadius: "16px",
                              width: "100%",
                            }}
                          >
                            <Typography>PGD</Typography>
                            <Typography>0+060</Typography>
                          </Box>
                        </Grid>
                        <Grid item xs={0.5}></Grid>
                      </Grid>
                    </Grid>
                    <Grid item xs={12}>
                      <Grid container columns={12}>
                        <Grid item xs={0.5}></Grid>
                        <Grid item xs={1} sx={{ justifyContent: "center" }}>
                          <Box
                            sx={{
                              width: "100%",
                              display: "flex",
                              justifyContent: "center",
                              alignItems: "center",
                              height: 40,
                              textTransform: "uppercase",
                              flexDirection: "column",
                            }}
                          ></Box>
                        </Grid>
                        <Grid item xs={1}>
                          <Box
                            sx={{
                              width: "100%",
                              display: "flex",
                              justifyContent: "center",
                              alignItems: "center",
                              textTransform: "uppercase",
                              flexDirection: "column",
                              mt: -3.2,
                            }}
                          >
                            <div
                              style={{
                                position: "absolute",
                                top: 182,
                                zIndex: 2,
                              }}
                            >
                              {timeTrain.filter(
                                (x) =>
                                  x.odd == false &&
                                  x._id === "62d115995be964c7a53d990c" &&
                                  x.status === "Bertugas"
                              ).length > 0 ? (
                                <img
                                  src={greenTrainRight}
                                  alt="Train"
                                  width="50px"
                                  style={{ zIndex: 1, marginRight: -35 }}
                                />
                              ) : (
                                <div style={{ height: 50 }}></div>
                              )}
                              <Typography
                                variant="body2"
                                sx={{
                                  fontSize: 12,
                                  fontWeight: 600,
                                  marginLeft: 1,
                                  marginRight: -40,
                                  position: "absolute",
                                  top: 50,
                                  zIndex: 2,
                                  lineHeight: 0,
                                }}
                              >
                                {
                                  timeTrain.filter(
                                    (x) =>
                                      x.odd == false &&
                                      x._id === "62d115995be964c7a53d990c" &&
                                      x.status === "Bertugas"
                                  )[0]?.trainNumber
                                }
                                {timeTrain.filter(
                                  (x) =>
                                    x.odd == false &&
                                    x._id === "62d115995be964c7a53d990c" &&
                                    x.status === "Bertugas"
                                )[0]?.lrv.length > 0 ? (
                                  <>
                                    (
                                    {timeTrain
                                      .filter(
                                        (x) =>
                                          x.odd == false &&
                                          x._id ===
                                            "62d115995be964c7a53d990c" &&
                                          x.status === "Bertugas"
                                      )[0]
                                      ?.lrv.map((item, i) => (
                                        <span
                                          key={i}
                                          style={{
                                            fontSize: 13,
                                            fontWeight: 600,
                                          }}
                                        >
                                          {(i ? ", " : "") + item}
                                        </span>
                                      ))}
                                    )
                                  </>
                                ) : (
                                  ""
                                )}
                              </Typography>
                            </div>
                          </Box>
                        </Grid>
                        <Grid item xs={1}>
                          <Box
                            sx={{
                              width: "100%",
                              display: "flex",
                              justifyContent: "center",
                              alignItems: "center",
                              textTransform: "uppercase",
                              flexDirection: "column",
                            }}
                          >
                            <div
                              style={{
                                position: "absolute",
                                top: 182,
                                zIndex: 2,
                              }}
                            >
                              {timeTrain.filter(
                                (x) =>
                                  x.odd == false &&
                                  x._id === "62d115ba5be964c7a53d990f" &&
                                  x.status === "Selesai"
                              ).length > 0 ? (
                                <img
                                  src={redTrainRight}
                                  alt="Train"
                                  width="50px"
                                  style={{ zIndex: 1 }}
                                />
                              ) : (
                                <div style={{ height: 50 }}></div>
                              )}
                              <Typography
                                variant="body2"
                                sx={{
                                  fontSize: 12,
                                  fontWeight: 600,
                                  marginLeft: 1,
                                  marginRight: -40,
                                  position: "absolute",
                                  top: 50,
                                  zIndex: 2,
                                  lineHeight: 0,
                                }}
                              >
                                {
                                  timeTrain.filter(
                                    (x) =>
                                      x.odd == false &&
                                      x._id === "62d115ba5be964c7a53d990f" &&
                                      x.status === "Selesai"
                                  )[0]?.trainNumber
                                }
                                {timeTrain.filter(
                                  (x) =>
                                    x.odd == false &&
                                    x._id === "62d115ba5be964c7a53d990f" &&
                                    x.status === "Selesai"
                                )[0]?.lrv.length > 0 ? (
                                  <>
                                    (
                                    {timeTrain
                                      .filter(
                                        (x) =>
                                          x.odd == false &&
                                          x._id ===
                                            "62d115ba5be964c7a53d990f" &&
                                          x.status === "Selesai"
                                      )[0]
                                      ?.lrv.map((item, i) => (
                                        <span
                                          key={i}
                                          style={{
                                            fontSize: 13,
                                            fontWeight: 600,
                                          }}
                                        >
                                          {(i ? ", " : "") + item}
                                        </span>
                                      ))}
                                    )
                                  </>
                                ) : (
                                  ""
                                )}
                              </Typography>
                            </div>
                          </Box>
                        </Grid>
                        <Grid item xs={1}>
                          <Box
                            sx={{
                              width: "100%",
                              display: "flex",
                              justifyContent: "center",
                              alignItems: "center",
                              textTransform: "uppercase",
                              flexDirection: "column",
                            }}
                          >
                            <div
                              style={{
                                position: "absolute",
                                top: 182,
                                zIndex: 2,
                              }}
                            >
                              {timeTrain.filter(
                                (x) =>
                                  x.odd == false &&
                                  x._id === "62d115ba5be964c7a53d990f" &&
                                  x.status === "Bertugas"
                              ).length > 0 ? (
                                <img
                                  src={greenTrainRight}
                                  alt="Train"
                                  width="50px"
                                  style={{ zIndex: 1, marginRight: -35 }}
                                />
                              ) : (
                                <div style={{ height: 50 }}></div>
                              )}
                              <Typography
                                variant="body2"
                                sx={{
                                  fontSize: 12,
                                  fontWeight: 600,
                                  marginLeft: 1,
                                  marginRight: -40,
                                  position: "absolute",
                                  top: 50,
                                  zIndex: 2,
                                  lineHeight: 0,
                                }}
                              >
                                {
                                  timeTrain.filter(
                                    (x) =>
                                      x.odd == false &&
                                      x._id === "62d115ba5be964c7a53d990f" &&
                                      x.status === "Bertugas"
                                  )[0]?.trainNumber
                                }
                                {timeTrain.filter(
                                  (x) =>
                                    x.odd == false &&
                                    x._id === "62d115ba5be964c7a53d990f" &&
                                    x.status === "Bertugas"
                                )[0]?.lrv.length > 0 ? (
                                  <>
                                    (
                                    {timeTrain
                                      .filter(
                                        (x) =>
                                          x.odd == false &&
                                          x._id ===
                                            "62d115ba5be964c7a53d990f" &&
                                          x.status === "Bertugas"
                                      )[0]
                                      ?.lrv.map((item, i) => (
                                        <span
                                          key={i}
                                          style={{
                                            fontSize: 13,
                                            fontWeight: 600,
                                          }}
                                        >
                                          {(i ? ", " : "") + item}
                                        </span>
                                      ))}
                                    )
                                  </>
                                ) : (
                                  ""
                                )}
                              </Typography>
                            </div>
                          </Box>
                        </Grid>
                        <Grid item xs={1}>
                          <Box
                            sx={{
                              width: "100%",
                              display: "flex",
                              justifyContent: "center",
                              alignItems: "center",
                              textTransform: "uppercase",
                              flexDirection: "column",
                            }}
                          >
                            <div
                              style={{
                                position: "absolute",
                                top: 182,
                                zIndex: 2,
                              }}
                            >
                              {timeTrain.filter(
                                (x) =>
                                  x.odd == false &&
                                  x._id === "62d115db5be964c7a53d9912" &&
                                  x.status === "Selesai"
                              ).length > 0 ? (
                                <img
                                  src={redTrainRight}
                                  alt="Train"
                                  width="50px"
                                  style={{ zIndex: 1 }}
                                />
                              ) : (
                                <div style={{ height: 50 }}></div>
                              )}
                              <Typography
                                variant="body2"
                                sx={{
                                  fontSize: 12,
                                  fontWeight: 600,
                                  marginLeft: 1,
                                  marginRight: -40,
                                  position: "absolute",
                                  top: 50,
                                  zIndex: 2,
                                  lineHeight: 0,
                                }}
                              >
                                {
                                  timeTrain.filter(
                                    (x) =>
                                      x.odd == false &&
                                      x._id === "62d115db5be964c7a53d9912" &&
                                      x.status === "Selesai"
                                  )[0]?.trainNumber
                                }
                                {timeTrain.filter(
                                  (x) =>
                                    x.odd == false &&
                                    x._id === "62d115db5be964c7a53d9912" &&
                                    x.status === "Selesai"
                                )[0]?.lrv.length > 0 ? (
                                  <>
                                    (
                                    {timeTrain
                                      .filter(
                                        (x) =>
                                          x.odd == false &&
                                          x._id ===
                                            "62d115db5be964c7a53d9912" &&
                                          x.status === "Selesai"
                                      )[0]
                                      ?.lrv.map((item, i) => (
                                        <span
                                          key={i}
                                          style={{
                                            fontSize: 13,
                                            fontWeight: 600,
                                          }}
                                        >
                                          {(i ? ", " : "") + item}
                                        </span>
                                      ))}
                                    )
                                  </>
                                ) : (
                                  ""
                                )}
                              </Typography>
                            </div>
                          </Box>
                        </Grid>
                        <Grid item xs={1}>
                          <Box
                            sx={{
                              width: "100%",
                              display: "flex",
                              justifyContent: "center",
                              alignItems: "center",
                              textTransform: "uppercase",
                              flexDirection: "column",
                            }}
                          >
                            <div
                              style={{
                                position: "absolute",
                                top: 182,
                                zIndex: 2,
                              }}
                            >
                              {timeTrain.filter(
                                (x) =>
                                  x.odd == false &&
                                  x._id === "62d115db5be964c7a53d9912" &&
                                  x.status === "Bertugas"
                              ).length > 0 ? (
                                <img
                                  src={greenTrainRight}
                                  alt="Train"
                                  width="50px"
                                  style={{ zIndex: 1, marginRight: -35 }}
                                />
                              ) : (
                                <div style={{ height: 50 }}></div>
                              )}
                              <Typography
                                variant="body2"
                                sx={{
                                  fontSize: 12,
                                  fontWeight: 600,
                                  marginLeft: 1,
                                  marginRight: -40,
                                  position: "absolute",
                                  top: 50,
                                  zIndex: 2,
                                  lineHeight: 0,
                                }}
                              >
                                {
                                  timeTrain.filter(
                                    (x) =>
                                      x.odd == false &&
                                      x._id === "62d115db5be964c7a53d9912" &&
                                      x.status === "Bertugas"
                                  )[0]?.trainNumber
                                }
                                {timeTrain.filter(
                                  (x) =>
                                    x.odd == false &&
                                    x._id === "62d115db5be964c7a53d9912" &&
                                    x.status === "Bertugas"
                                )[0]?.lrv.length > 0 ? (
                                  <>
                                    (
                                    {timeTrain
                                      .filter(
                                        (x) =>
                                          x.odd == false &&
                                          x._id ===
                                            "62d115db5be964c7a53d9912" &&
                                          x.status === "Bertugas"
                                      )[0]
                                      ?.lrv.map((item, i) => (
                                        <span
                                          key={i}
                                          style={{
                                            fontSize: 13,
                                            fontWeight: 600,
                                          }}
                                        >
                                          {(i ? ", " : "") + item}
                                        </span>
                                      ))}
                                    )
                                  </>
                                ) : (
                                  ""
                                )}
                              </Typography>
                            </div>
                          </Box>
                        </Grid>
                        <Grid item xs={1}>
                          <Box
                            sx={{
                              width: "100%",
                              display: "flex",
                              justifyContent: "center",
                              alignItems: "center",
                              textTransform: "uppercase",
                              flexDirection: "column",
                            }}
                          >
                            <div
                              style={{
                                position: "absolute",
                                top: 182,
                                zIndex: 2,
                              }}
                            >
                              {timeTrain.filter(
                                (x) =>
                                  x.odd == false &&
                                  x._id === "62d115f85be964c7a53d9915" &&
                                  x.status === "Selesai"
                              ).length > 0 ? (
                                <img
                                  src={redTrainRight}
                                  alt="Train"
                                  width="50px"
                                  style={{ zIndex: 1 }}
                                />
                              ) : (
                                <div style={{ height: 50 }}></div>
                              )}
                              <Typography
                                variant="body2"
                                sx={{
                                  fontSize: 12,
                                  fontWeight: 600,
                                  marginLeft: 1,
                                  marginRight: -40,
                                  position: "absolute",
                                  top: 50,
                                  zIndex: 2,
                                  lineHeight: 0,
                                }}
                              >
                                {
                                  timeTrain.filter(
                                    (x) =>
                                      x.odd == false &&
                                      x._id === "62d115f85be964c7a53d9915" &&
                                      x.status === "Selesai"
                                  )[0]?.trainNumber
                                }
                                {timeTrain.filter(
                                  (x) =>
                                    x.odd == false &&
                                    x._id === "62d115f85be964c7a53d9915" &&
                                    x.status === "Selesai"
                                )[0]?.lrv.length > 0 ? (
                                  <>
                                    (
                                    {timeTrain
                                      .filter(
                                        (x) =>
                                          x.odd == false &&
                                          x._id ===
                                            "62d115f85be964c7a53d9915" &&
                                          x.status === "Selesai"
                                      )[0]
                                      ?.lrv.map((item, i) => (
                                        <span
                                          key={i}
                                          style={{
                                            fontSize: 13,
                                            fontWeight: 600,
                                          }}
                                        >
                                          {(i ? ", " : "") + item}
                                        </span>
                                      ))}
                                    )
                                  </>
                                ) : (
                                  ""
                                )}
                              </Typography>
                            </div>
                          </Box>
                        </Grid>
                        <Grid item xs={1}>
                          <Box
                            sx={{
                              width: "100%",
                              display: "flex",
                              justifyContent: "center",
                              alignItems: "center",
                              textTransform: "uppercase",
                              flexDirection: "column",
                            }}
                          >
                            <div
                              style={{
                                position: "absolute",
                                top: 182,
                                zIndex: 2,
                              }}
                            >
                              {timeTrain.filter(
                                (x) =>
                                  x.odd == false &&
                                  x._id === "62d115f85be964c7a53d9915" &&
                                  x.status === "Bertugas"
                              ).length > 0 ? (
                                <img
                                  src={greenTrainRight}
                                  alt="Train"
                                  width="50px"
                                  style={{ zIndex: 1, marginRight: -35 }}
                                />
                              ) : (
                                <div style={{ height: 50 }}></div>
                              )}
                              <Typography
                                variant="body2"
                                sx={{
                                  fontSize: 12,
                                  fontWeight: 600,
                                  marginLeft: 1,
                                  marginRight: -40,
                                  position: "absolute",
                                  top: 50,
                                  zIndex: 2,
                                  lineHeight: 0,
                                }}
                              >
                                {
                                  timeTrain.filter(
                                    (x) =>
                                      x.odd == false &&
                                      x._id === "62d115f85be964c7a53d9915" &&
                                      x.status === "Bertugas"
                                  )[0]?.trainNumber
                                }
                                {timeTrain.filter(
                                  (x) =>
                                    x.odd == false &&
                                    x._id === "62d115f85be964c7a53d9915" &&
                                    x.status === "Bertugas"
                                )[0]?.lrv.length > 0 ? (
                                  <>
                                    (
                                    {timeTrain
                                      .filter(
                                        (x) =>
                                          x.odd == false &&
                                          x._id ===
                                            "62d115f85be964c7a53d9915" &&
                                          x.status === "Bertugas"
                                      )[0]
                                      ?.lrv.map((item, i) => (
                                        <span
                                          key={i}
                                          style={{
                                            fontSize: 13,
                                            fontWeight: 600,
                                          }}
                                        >
                                          {(i ? ", " : "") + item}
                                        </span>
                                      ))}
                                    )
                                  </>
                                ) : (
                                  ""
                                )}
                              </Typography>
                            </div>
                          </Box>
                        </Grid>
                        <Grid item xs={1}>
                          <Box
                            sx={{
                              width: "100%",
                              display: "flex",
                              justifyContent: "center",
                              alignItems: "center",
                              textTransform: "uppercase",
                              flexDirection: "column",
                            }}
                          >
                            <div
                              style={{
                                position: "absolute",
                                top: 182,
                                zIndex: 2,
                              }}
                            >
                              {timeTrain.filter(
                                (x) =>
                                  x.odd == false &&
                                  x._id === "62d1161e5be964c7a53d9918" &&
                                  x.status === "Selesai"
                              ).length > 0 ? (
                                <img
                                  src={redTrainRight}
                                  alt="Train"
                                  width="50px"
                                  style={{ zIndex: 1 }}
                                />
                              ) : (
                                <div style={{ height: 50 }}></div>
                              )}
                              <Typography
                                variant="body2"
                                sx={{
                                  fontSize: 12,
                                  fontWeight: 600,
                                  marginLeft: 1,
                                  marginRight: -40,
                                  position: "absolute",
                                  top: 50,
                                  zIndex: 2,
                                  lineHeight: 0,
                                }}
                              >
                                {
                                  timeTrain.filter(
                                    (x) =>
                                      x.odd == false &&
                                      x._id === "62d1161e5be964c7a53d9918" &&
                                      x.status === "Selesai"
                                  )[0]?.trainNumber
                                }
                                {timeTrain.filter(
                                  (x) =>
                                    x.odd == false &&
                                    x._id === "62d1161e5be964c7a53d9918" &&
                                    x.status === "Selesai"
                                )[0]?.lrv.length > 0 ? (
                                  <>
                                    (
                                    {timeTrain
                                      .filter(
                                        (x) =>
                                          x.odd == false &&
                                          x._id ===
                                            "62d1161e5be964c7a53d9918" &&
                                          x.status === "Selesai"
                                      )[0]
                                      ?.lrv.map((item, i) => (
                                        <span
                                          key={i}
                                          style={{
                                            fontSize: 13,
                                            fontWeight: 600,
                                          }}
                                        >
                                          {(i ? ", " : "") + item}
                                        </span>
                                      ))}
                                    )
                                  </>
                                ) : (
                                  ""
                                )}
                              </Typography>
                            </div>
                          </Box>
                        </Grid>
                        <Grid item xs={1}>
                          <Box
                            sx={{
                              width: "100%",
                              display: "flex",
                              justifyContent: "center",
                              alignItems: "center",
                              textTransform: "uppercase",
                              flexDirection: "column",
                            }}
                          >
                            <div
                              style={{
                                position: "absolute",
                                top: 182,
                                zIndex: 2,
                              }}
                            >
                              {timeTrain.filter(
                                (x) =>
                                  x.odd == false &&
                                  x._id === "62d1161e5be964c7a53d9918" &&
                                  x.status === "Bertugas"
                              ).length > 0 ? (
                                <img
                                  src={greenTrainRight}
                                  alt="Train"
                                  width="50px"
                                  style={{ zIndex: 1, marginLeft: -30 }}
                                />
                              ) : (
                                <div style={{ height: 50 }}></div>
                              )}
                              <Typography
                                variant="body2"
                                sx={{
                                  fontSize: 12,
                                  fontWeight: 600,
                                  position: "absolute",
                                  marginLeft: -3,
                                  top: 50,
                                  zIndex: 2,
                                  lineHeight: 0,
                                }}
                              >
                                {
                                  timeTrain.filter(
                                    (x) =>
                                      x.odd == false &&
                                      x._id === "62d1161e5be964c7a53d9918" &&
                                      x.status === "Bertugas"
                                  )[0]?.trainNumber
                                }
                                {timeTrain.filter(
                                  (x) =>
                                    x.odd == false &&
                                    x._id === "62d1161e5be964c7a53d9918" &&
                                    x.status === "Bertugas"
                                )[0]?.lrv.length > 0 ? (
                                  <>
                                    (
                                    {timeTrain
                                      .filter(
                                        (x) =>
                                          x.odd == false &&
                                          x._id ===
                                            "62d1161e5be964c7a53d9918" &&
                                          x.status === "Bertugas"
                                      )[0]
                                      ?.lrv.map((item, i) => (
                                        <span
                                          key={i}
                                          style={{
                                            fontSize: 13,
                                            fontWeight: 600,
                                          }}
                                        >
                                          {(i ? ", " : "") + item}
                                        </span>
                                      ))}
                                    )
                                  </>
                                ) : (
                                  ""
                                )}
                              </Typography>
                            </div>
                          </Box>
                        </Grid>
                        <Grid item xs={1}></Grid>
                        <Grid item xs={0.5}></Grid>
                      </Grid>
                    </Grid>
                    <Grid item xs={12}>
                      <Box sx={{ position: "relative" }}>
                        <Box
                          sx={{
                            width: "100%",
                            height: 3,
                            backgroundColor: "#000000",
                            position: "absolute",
                            bottom: 14,
                          }}
                        />
                        <Box
                          sx={{
                            width: 125,
                            height: 80,
                            bottom: 50,
                            left: 10,
                            borderBottom: "4px solid #000",
                            transform: "rotate(-65deg)",
                            position: "absolute",
                          }}
                        />
                        <Box
                          sx={{
                            width: 125,
                            height: 80,
                            bottom: 50,
                            right: 80,
                            borderBottom: "4px solid #000",
                            transform: "rotate(-65deg)",
                            position: "absolute",
                          }}
                        />
                      </Box>
                    </Grid>
                  </Grid>
                  <Grid container spacing={1} sx={{ mt: 1 }}>
                    <Grid item xs={12}>
                      <Grid
                        container
                        sx={{ overflow: "hidden" }}
                        spacing={1}
                        columns={10}
                      >
                        <Grid item xs={2}>
                          <Typography
                            sx={{
                              textTransform: "uppercase",
                              backgroundColor: "#464748",
                              color: "white",
                              fontWeight: "normal",
                              "@media only screen and (min-width: 5000px": {
                                fontSize: window.screen.width / 80,
                              },
                            }}
                            align="center"
                          >
                            {(dataScheduleTrainDriverLangsir[activeLangsir]
                              ?.trainDriver?.jobrole === "Masinis" &&
                              dataScheduleTrainDriverLangsir[activeLangsir]
                                ?.loopRouteTrain?.code === "S1") ||
                            dataScheduleTrainDriverLangsir[activeLangsir]
                              ?.loopRouteTrain?.code === "S2"
                              ? "Masinis Cadangan"
                              : dataScheduleTrainDriverLangsir[activeLangsir]
                                  ?.trainDriver?.jobrole === "Masinis" &&
                                dataScheduleTrainDriverLangsir[activeLangsir]
                                  ?.loopRouteTrain?.code === "R"
                              ? "Masinis Langsir"
                              : dataScheduleTrainDriverLangsir[activeLangsir]
                                  ?.trainDriver?.jobrole ===
                                  "Asisten Masinis" &&
                                dataScheduleTrainDriverLangsir[activeLangsir]
                                  ?.loopRouteTrain?.code === "S1"
                              ? "Asisten Masinis"
                              : "Penyelia"}
                          </Typography>
                        </Grid>
                        <Grid item xs={8}>
                          <Typography
                            sx={{
                              textTransform: "uppercase",
                              backgroundColor: "#464748",
                              color: "white",
                              fontWeight: "normal",
                              "@media only screen and (min-width: 5000px": {
                                fontSize: window.screen.width / 80,
                              },
                            }}
                            align="center"
                          >
                            Masinis Mainline
                          </Typography>
                        </Grid>
                        <Grid item xs={2} sx={{ height: "9rem" }}>
                          <Carousel
                            autoPlay
                            infiniteLoop
                            interval={
                              dataScheduleTrainDriverLangsir[activeLangsir]
                                ?.duration * 1000
                            }
                            // animationHandler={'fade'}
                            // axis={'vertical'}
                            selectedItem={activeLangsir}
                            onChange={setActiveLangsir}
                            showArrows={false}
                            showStatus={false}
                            showIndicators={false}
                            showThumbs={false}
                          >
                            {dataScheduleTrainDriverLangsir.length > 0 &&
                              dataScheduleTrainDriverLangsir.map(
                                (item, index) => {
                                  return (
                                    <CarouselInformations
                                      key={index}
                                      zeroMinWidth
                                      sx={{
                                        height: "9rem",
                                        backgroundColor: "white",
                                        paddingLeft: 0.5,
                                        paddingRight: 0.5,
                                      }}
                                    >
                                      <Grid container justifyContent={"center"}>
                                        <img
                                          component="img"
                                          src={
                                            StaticVar.URL_PHOTO +
                                            "/" +
                                            item?.trainDriver?.photo
                                          }
                                          alt={`Masinis Mainline ${index + 1}`}
                                          style={{ width: 75, height: 75 }}
                                        />
                                      </Grid>
                                      <Typography
                                        align="center"
                                        sx={{
                                          fontSize: "0.9em",
                                          fontWeight: 600,
                                          mt: 0.1,
                                          textTransform: "uppercase",
                                          "@media only screen and (min-width: 5000px":
                                            {
                                              fontSize:
                                                window.screen.width / 90,
                                            },
                                        }}
                                      >
                                        {item?.trainDriver?.nickname
                                          ? item?.trainDriver?.nickname
                                          : splitNameAbbrevation(
                                              item?.trainDriver?.name
                                            )}
                                      </Typography>
                                      <Typography
                                        variant="body2"
                                        sx={{
                                          fontWeight: "normal",
                                          fontSize: "0.8em",
                                          textTransform: "uppercase",
                                          "@media only screen and (min-width: 5000px":
                                            {
                                              fontSize:
                                                window.screen.width / 100,
                                            },
                                        }}
                                        align="center"
                                      >
                                        {item?.trainDriver?.nik || 0}
                                      </Typography>
                                      <Stack
                                        sx={{
                                          flexDirection: "row",
                                          justifyContent: "space-between",
                                        }}
                                      >
                                        <Typography
                                          variant="body2"
                                          component="div"
                                          sx={{
                                            textTransform: "uppercase",
                                            fontWeight: 600,
                                            color: "#A2A2A2",
                                            fontSize: window.screen.width / 180,
                                          }}
                                          align="center"
                                        >
                                          Kode:
                                          {item?.loopRouteTrain?.code || "0"}
                                        </Typography>
                                        <Typography
                                          variant="body2"
                                          sx={{
                                            textTransform: "uppercase",
                                            fontWeight: 600,
                                            fontSize: window.screen.width / 180,
                                          }}
                                          align="center"
                                        >
                                          Loop:
                                          {item?.loopRouteTrain?.loop || "0"}
                                        </Typography>
                                      </Stack>
                                      <Typography
                                        variant="body2"
                                        sx={{
                                          textTransform: "uppercase",
                                          fontWeight: 600,
                                          fontSize: window.screen.width / 180,
                                        }}
                                        align="left"
                                      >
                                        LRV:
                                        {item?.LRVList &&
                                        item?.LRVList.length > 0
                                          ? item?.LRVList.map((item) => item)
                                          : ""}
                                      </Typography>
                                    </CarouselInformations>
                                  );
                                }
                              )}
                          </Carousel>
                        </Grid>
                        <Grid item xs={8} sx={{ height: "9rem" }}>
                          <Grid container>
                            {/* MAINLINE */}
                            {dataScheduleTrainDriver
                              .filter((item) => item.status === "On Duty")
                              .map((item, index) => {
                                //const arrayName = trainDriver.name.split(" ")

                                return (
                                  <Grid
                                    item
                                    xs={3}
                                    key={index}
                                    zeroMinWidth
                                    sx={{
                                      height: "9rem",
                                      backgroundColor: "white",
                                      paddingLeft: 1,
                                      paddingRight: 1,
                                      borderRight: "2px solid #b0b0b0",
                                    }}
                                  >
                                    <Grid container justifyContent={"center"}>
                                      <img
                                        component="img"
                                        src={
                                          StaticVar.URL_PHOTO +
                                          "/" +
                                          item?.trainDriver?.photo
                                        }
                                        alt={`Masinis Mainline ${index + 1}`}
                                        height={75}
                                      />
                                    </Grid>
                                    <Typography
                                      align="center"
                                      sx={{
                                        fontSize: "0.9em",
                                        fontWeight: 600,
                                        mt: 0.1,
                                        textTransform: "uppercase",
                                        "@media only screen and (min-width: 5000px":
                                          {
                                            fontSize: window.screen.width / 90,
                                          },
                                      }}
                                    >
                                      {item?.trainDriver?.nickname
                                        ? item?.trainDriver?.nickname
                                        : splitNameAbbrevation(
                                            item?.trainDriver?.name
                                          )}
                                    </Typography>
                                    <Typography
                                      variant="body2"
                                      sx={{
                                        fontWeight: "normal",
                                        fontSize: "0.8em",
                                        textTransform: "uppercase",
                                        "@media only screen and (min-width: 5000px":
                                          {
                                            fontSize: window.screen.width / 100,
                                          },
                                      }}
                                      align="center"
                                    >
                                      {item?.trainDriver?.nik || 0}
                                    </Typography>
                                    <Stack
                                      sx={{
                                        flexDirection: "row",
                                        justifyContent: "space-between",
                                      }}
                                    >
                                      <Typography
                                        variant="body2"
                                        component="div"
                                        sx={{
                                          textTransform: "uppercase",
                                          fontWeight: 600,
                                          color: "#A2A2A2",
                                          fontSize: window.screen.width / 180,
                                        }}
                                        align="center"
                                      >
                                        Kode:
                                        {item?.loopRouteTrain?.code || "0"}
                                      </Typography>
                                      <Typography
                                        variant="body2"
                                        sx={{
                                          textTransform: "uppercase",
                                          fontWeight: 600,
                                          fontSize: window.screen.width / 180,
                                        }}
                                        align="center"
                                      >
                                        Loop:
                                        {item?.loopRouteTrain?.loop || "0"}
                                      </Typography>
                                    </Stack>

                                    <Typography
                                      variant="body2"
                                      sx={{
                                        textTransform: "uppercase",
                                        fontWeight: 600,
                                        fontSize: window.screen.width / 180,
                                      }}
                                      align="left"
                                    >
                                      LRV:
                                      {item?.LRVList && item?.LRVList.length > 0
                                        ? item?.LRVList.map((item) => item)
                                        : ""}
                                    </Typography>
                                  </Grid>
                                );
                              })}
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                    {/* SCHEDULE*/}
                    <Grid item xs={12} sx={{ p: "0px" }}>
                      <Grid
                        container
                        sx={{
                          bgcolor: "#BB7E36",
                          color: "#fff",
                          justifyContent: "center",
                          textAlign: "center",
                          fontWeight: 600,
                          minWidth: 0,
                        }}
                      >
                        <Grid item xs={12} sm={3} md={0.7} lg={0.7}>
                          <Typography
                            sx={{ textTransform: "uppercase", fontSize: 13 }}
                          >
                            Kode
                          </Typography>
                        </Grid>
                        <Grid item xs={12} sm={3} md={0.7} lg={0.7}>
                          <Typography
                            sx={{ textTransform: "uppercase", fontSize: 13 }}
                          >
                            Loop
                          </Typography>
                        </Grid>
                        <Grid item xs={12} sm={3} md={5.4} lg={5.4}>
                          <Typography
                            sx={{ textTransform: "uppercase", fontSize: 13 }}
                          >
                            No. KA
                          </Typography>
                        </Grid>
                        <Grid item xs={12} sm={3} md={0.7} lg={0.7}>
                          <Typography
                            sx={{ textTransform: "uppercase", fontSize: 13 }}
                          >
                            Mulai
                          </Typography>
                        </Grid>
                        <Grid item xs={12} sm={3} md={0.7} lg={0.7}>
                          <Typography
                            sx={{ textTransform: "uppercase", fontSize: 13 }}
                          >
                            Habis
                          </Typography>
                        </Grid>
                        <Grid item xs={12} sm={3} md={2} lg={2}>
                          <Typography
                            sx={{ textTransform: "uppercase", fontSize: 13 }}
                          >
                            Masinis
                          </Typography>
                        </Grid>
                        <Grid item xs={12} sm={3} md={0.6} lg={0.6}>
                          <Typography
                            sx={{ textTransform: "uppercase", fontSize: 13 }}
                          >
                            LRV
                          </Typography>
                        </Grid>
                        <Grid item xs={12} sm={3} md={1.2} lg={1.2}>
                          <Typography
                            sx={{ textTransform: "uppercase", fontSize: 13 }}
                          >
                            Status
                          </Typography>
                        </Grid>
                      </Grid>

                      <Carousel
                        autoPlay
                        infiniteLoop
                        interval={2000}
                        // animationHandler={'fade'}
                        axis={"vertical"}
                        showArrows={false}
                        showStatus={false}
                        showIndicators={false}
                        showThumbs={false}
                      >
                        {dataScheduleSplit.length > 0 &&
                          dataScheduleSplit.map((dataVal, index) => (
                            <Box
                              key={index}
                              height={200}
                              minHeight={200}
                              padding={0}
                              alignItems="center"
                            >
                              {dataVal
                                .filter(
                                  (item) => item.loopRouteTrain.code !== "OFF"
                                )
                                .map((schedule, no) => {
                                  //const codeArray = schedule.train.split(" ")
                                  let statusLRV =
                                    schedule?.loopRouteTrain?.route
                                      .filter((x) => x.status === "Start")[0]
                                      ?.station.filter(
                                        (x) => x.status === "Start"
                                      )[0] || "";
                                  return (
                                    <Grid
                                      key={no}
                                      container
                                      alignItems="center"
                                      sx={{
                                        bgcolor: "#fff",
                                        borderBottom: "3px solid #EAEAEA",
                                        height: 45,
                                        minWidth: 0,
                                        p: "0px",
                                      }}
                                    >
                                      <Grid
                                        item
                                        xs={12}
                                        sm={3}
                                        md={0.7}
                                        lg={0.7}
                                      >
                                        <Typography
                                          sx={{
                                            textTransform: "uppercase",

                                            fontSize: window.screen.width / 135,
                                          }}
                                        >
                                          {schedule.loopRouteTrain.code?.replace(
                                            /\s/g,
                                            ""
                                          )}
                                        </Typography>
                                      </Grid>
                                      <Grid
                                        item
                                        xs={12}
                                        sm={3}
                                        md={0.7}
                                        lg={0.7}
                                      >
                                        <Typography
                                          sx={{
                                            textTransform: "uppercase",

                                            fontSize: window.screen.width / 135,
                                          }}
                                        >
                                          {schedule?.loopRouteTrain?.loop
                                            .replace(/\b(\w)\w+/g, "$1")
                                            .replace(/\s/g, "")
                                            .replace(/\.$/, "")
                                            .toUpperCase() || ""}
                                        </Typography>
                                      </Grid>
                                      <Grid
                                        item
                                        xs={12}
                                        sm={3}
                                        md={5.4}
                                        lg={5.4}
                                      >
                                        <Box
                                          sx={{
                                            bgcolor: "#fff",
                                            textAlign: "left",
                                          }}
                                        >
                                          {schedule?.loopRouteTrain?.route.map(
                                            (itemArray, indexItem) => {
                                              return (
                                                <Typography
                                                  key={indexItem}
                                                  component="span"
                                                  sx={{
                                                    backgroundColor:
                                                      itemArray.status ===
                                                      "Start"
                                                        ? "green"
                                                        : itemArray.status ===
                                                          "Finish"
                                                        ? "red"
                                                        : "#f2f2f2",
                                                    mr: 0.1,
                                                    color:
                                                      itemArray.status ===
                                                      "Start"
                                                        ? "#FFF"
                                                        : itemArray.status ===
                                                          "Finish"
                                                        ? "#FFF"
                                                        : "#000",
                                                    p: 0.3,
                                                    fontSize:
                                                      window.screen.width / 150,
                                                  }}
                                                >
                                                  {itemArray.trainNumber}
                                                </Typography>
                                              );
                                            }
                                          )}
                                        </Box>
                                      </Grid>
                                      <Grid
                                        item
                                        xs={12}
                                        sm={3}
                                        md={0.7}
                                        lg={0.7}
                                      >
                                        <Typography
                                          sx={{
                                            textTransform: "uppercase",
                                            fontSize: window.screen.width / 135,
                                          }}
                                        >
                                          {schedule.loopRouteTrain?.start || ""}
                                        </Typography>
                                      </Grid>
                                      <Grid
                                        item
                                        xs={12}
                                        sm={3}
                                        md={0.7}
                                        lg={0.7}
                                      >
                                        <Typography
                                          sx={{
                                            textTransform: "uppercase",
                                            fontSize: window.screen.width / 135,
                                          }}
                                        >
                                          {schedule.loopRouteTrain?.end || ""}
                                        </Typography>
                                      </Grid>
                                      <Grid item xs={12} sm={3} md={2} lg={2}>
                                        <Typography
                                          sx={{
                                            textTransform: "uppercase",
                                            fontSize: window.screen.width / 135,
                                          }}
                                        >
                                          {schedule?.trainDriver?.nickname
                                            ? schedule?.trainDriver?.nickname
                                            : splitNameAbbrevation(
                                                schedule?.trainDriver?.name
                                              )}
                                        </Typography>
                                      </Grid>
                                      <Grid
                                        item
                                        xs={12}
                                        sm={3}
                                        md={0.6}
                                        lg={0.6}
                                      >
                                        <Typography
                                          sx={{
                                            textTransform: "uppercase",
                                            textAlign: "center",
                                            fontSize: window.screen.width / 135,
                                          }}
                                        >
                                          {schedule?.LRVList &&
                                          schedule?.LRVList.length > 0
                                            ? schedule?.LRVList.map(
                                                (item) => item
                                              )
                                            : ""}
                                        </Typography>
                                      </Grid>
                                      <Grid
                                        item
                                        xs={12}
                                        sm={3}
                                        md={1.2}
                                        lg={1.2}
                                      >
                                        <Box
                                          sx={{
                                            width: "100%",
                                            backgroundColor:
                                              statusLRV === ""
                                                ? "#A2A2A2"
                                                : statusLRV?.start === "" &&
                                                  statusLRV.end !== ""
                                                ? "red"
                                                : "#28A745",
                                            color: "white",
                                            height: 40,
                                            display: "flex",
                                            textTransform: "uppercase",
                                            justifyContent: "center",
                                            alignItems: "center",
                                            fontSize: window.screen.width / 135,
                                          }}
                                        >
                                          <small>
                                            {statusLRV === ""
                                              ? "Belum Bertugas"
                                              : statusLRV?.start === "" &&
                                                statusLRV?.end !== ""
                                              ? "Selesai"
                                              : "Bertugas"}
                                          </small>
                                        </Box>
                                      </Grid>
                                    </Grid>
                                  );
                                })}
                            </Box>
                          ))}
                      </Carousel>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Box>
          </div>
        </>
      ) : key ? (
        <center style={{ padding: 25 }}>
          <Typography variant="h3">
            Pemasangan TV display tidak sesuai. Periksa Key Authentikasi Anda
          </Typography>
          <Typography variant="h5">Kode Key kamu : {key}</Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={async () => {
              await localStorage.setItem("access_token", key);
              window.location.reload();
            }}
          >
            RELOAD
          </Button>
        </center>
      ) : (
        <center style={{ padding: 25 }}>
          <Typography variant="h3">
            Pemasangan TV display tidak sesuai. Periksa Key Authentikasi Anda
          </Typography>
          <Typography variant="h3">Silahkan Hubungi Admin IT</Typography>
        </center>
      )}
    </>
  );
};

export default DisplayLED;
