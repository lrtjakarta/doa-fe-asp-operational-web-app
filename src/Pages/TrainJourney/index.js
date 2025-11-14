import {
  Box,
  Button,
  Container,
  Grid,
  TableRow,
  Typography,
  styled,
} from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import { useHistory } from "react-router-dom";

// style
import { judulTextStyle } from "./StylesList";

import CustomHeaderTable from "./component/CustomHeaderTable";

import { DailyWorkContext, DinasanContext } from "Context";
import { UserProfilContext } from "Context";
import { StasiunContext } from "Context";
import { NoGoItemContext } from "Context";

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: "theme.palette.action.hover",
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#BB7E36",
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 12,
    fontWeight: 100,
  },
}));

let sync = true

function ListDinasanPage() {
  const history = useHistory();

  // context
  const { listDinasan, getDataDinas } = useContext(DinasanContext);
  const { userProfile, userWorkorder, operational_id } = useContext(UserProfilContext);
  const { dataStasiun, getAllStasiun } = useContext(StasiunContext);
  const { listNoGoItem, getDataNoGoItem } = useContext(NoGoItemContext);

  const { getDetailDaily, dataDetailDaily, updateDataScheduleTrainDriverById } = useContext(DailyWorkContext);

  // state
  const [dataHeader, setDataHeader] = useState([
    "No",
    "Dinasan",
    "Jam Dinasan",
    // "Loop",
    "Nomor KA",
    "Pemeriksaan Sarana",
    "Serah Terima Dinas",
    "Aksi",
  ]);
  const [allData, setAllData] = useState([]);

  const [loading, setLoading] = useState(false)


  const handleView = async(row) => {
    if(!(row?.trainJourneyLog))
    {
      await updateDataScheduleTrainDriverById(row.operational_id, {
        "trainJourneyLog.stateJourney": "Boarding The Cabin",
        "trainJourneyLog.firstBoarding": new Date(),
        status : "On Duty"
      })
    }
    history.push("/app/operational/trainjourney/Table?id="+row.operational_id);
  };

  // useEffect
  useEffect(() => {
    // if(sync && userProfile && dataDetailDaily)
    // {
      
      

      const getDataDinasSync = async()=>{
        setLoading(true)
        console.log('userWorkorder', userWorkorder, userProfile)
        const dataStationList = await getAllStasiun();
        const dataNoGoITemList = await getDataNoGoItem({ searchDate: new Date(userWorkorder?.dailyWorkDate) });
        const dinasanList = await getDataDinas(userProfile?.officerId, {date: new Date(userWorkorder?.dailyWorkDate)});
        console.log('dataLog', userProfile?.officerId,dataStationList, userWorkorder, dataNoGoITemList, dinasanList)
        if(dinasanList && dinasanList?.length>0){
          let _allData = []
          dinasanList.map(async (itemDinas,indexDinas)=>{
            let detailDailyList = await getDetailDaily(itemDinas.operational_id, false)

            const dataCombine = await combineData(itemDinas, dataStationList, dataNoGoITemList, detailDailyList?.data)
            console.log('dataCombine', detailDailyList?.data, dataCombine)
            _allData.push(dataCombine)
            if(indexDinas === dinasanList.length -1) {
              setLoading(false)
            }
          })
          setAllData(_allData);
        }
      }
      getDataDinasSync()

      // sync = false
    // }
    
  }, [userProfile, dataDetailDaily]);

  const combineData = (dataList, stationList, goNoItemList, detailDaily)=>{
    // const _allDinas = dataList
    //   .map((item, index) => {
        const _filterStasiun = stationList
          .filter((x) => x._id === dataList.workOrder?.location)
          .map((item) => {
            return {
              id: item._id,
              name: item.stationName,
              code: item.stationCode,
            };
          });

        const matchingData = goNoItemList.find(
          (xy) => xy?.informationService?.code === dataList?.workOrder?.code
        );

        let routeKA = [] 
        let handOver = false
        let trainCheck = false
        let loopRoute ;
        console.log('matchingData', goNoItemList, matchingData)
        console.log('cek combine', detailDaily?.loopRouteTrain?.code, dataList.workOrder?.code)
        if(detailDaily?.loopRouteTrain?.code === dataList.workOrder?.code){
          routeKA =  detailDaily?.loopRouteTrain.route
          if(dataList?.workOrder?.index === "first"){
            handOver = true
            trainCheck = matchingData ? true : false
          }
          else{
            handOver = detailDaily.readTakeGive
            trainCheck = true
          }
          loopRoute =  detailDaily?.loopRouteTrain
        }
        // console.log("matchingData", matchingData);

        return {
          ...dataList,
          trainJourneyLog: detailDaily?.trainJourneyLog,
          station: _filterStasiun[0],
          status: matchingData ? matchingData.status : "Belum Diisi",
          route: routeKA,
          loopRoute, 
          trainCheck,
          handOver,
          dataRow: matchingData,
        };
      //});
   
    //return _allDinas
  }

  // useEffect(() => {
  //   const _allDinas = listDinasan
  //     .map((item, index) => {
  //       const _filterStasiun = dataStasiun
  //         .filter((x) => x._id === item.workOrder?.location)
  //         .map((item) => {
  //           return {
  //             id: item._id,
  //             name: item.stationName,
  //             code: item.stationCode,
  //           };
  //         });

  //       const matchingData = listNoGoItem.find(
  //         (xy) => xy.informationService.code === item.workOrder?.code
  //       );

  //       let routeKA = [] 
  //       let handOver = false
  //       let trainCheck = false
  //       if(dataDetailDaily?.loopRouteTrain?.code === item.workOrder?.code){
  //         routeKA =  dataDetailDaily?.loopRouteTrain.route
  //         if(item?.workOrder?.index === "first"){
  //           handOver = true
  //           trainCheck = matchingData ? true : false
  //         }
  //         else{
  //           handOver = dataDetailDaily.readTakeGive
  //           trainCheck = true
  //         }
  //       }
  //       // console.log("matchingData", matchingData);

  //       return {
  //         ...item,
  //         station: _filterStasiun[0],
  //         status: matchingData ? matchingData.status : "Belum Diisi",
  //         route: routeKA,
  //         trainCheck,
  //         handOver,
  //         dataRow: matchingData,
  //       };
  //     });
  //   setAllData(_allDinas);
  //   // console.log('data', _allDinas)
  // }, [listDinasan]);

  // console.log("listDinasan", userProfile);

  return (
    <Box sx={{ p: 3 }}>
      <Container maxWidth="xl">
        <Grid
          sx={{ mt: 5 }}
          container
          justifyContent="space-between"
          alignItems={"center"}
        >
          <Grid item xs={12} sm={12}>
            <Typography sx={judulTextStyle}>Perjalanan KA</Typography>
          </Grid>
          <Grid item xs={12} sm={12}>
            <CustomHeaderTable
              dataHeader={dataHeader}
              dataBody={
                <>
                  {allData.map((item, index) => {
                    const _listData = item?.workOrder;
                    // console.log('item.status', item.status)
                    const getStatusStyles = (status) => {
                      switch (status) {
                        case "Belum Diisi":
                          return {
                            backgroundColor: "#FFF5F8",
                            color: "#F1416C",
                          };
                        case "Selesai":
                          return {
                            backgroundColor: "#E8FFF3",
                            color: "#50CD89",
                          };
                        default:
                          return null; // Mengembalikan null jika status tidak ditemukan
                      }
                    };
                    const statusStyles = getStatusStyles(item?.status);
                    return (
                      <StyledTableRow>
                        <StyledTableCell style={{textAlign:'center'}}>{index + 1}</StyledTableCell>
                        <StyledTableCell style={{textAlign:'center'}}>{item?.loopRoute?.code}</StyledTableCell>
                        <StyledTableCell>
                          {item?.workOrder?.start + " - " + item?.workOrder?.end}
                        </StyledTableCell>
                        {/* <StyledTableCell style={{textAlign:'center'}}>{item?.loopRoute?.loop}</StyledTableCell> */}
                        <StyledTableCell>
                          {item.route.map(x=>(
                            <span
                                style={{
                                  padding: 2,
                                  margin: 1,
                                  color:x?.status === "Finish" ||  x?.status === "Start" ? "white" :  "black",
                                  backgroundColor: x?.status === "Finish"? "red" : x?.status === "Start" ? "green": "#CFCFCF",
                                }}>
                                {x?.trainNumber}
                              </span>
                          ))}
                        </StyledTableCell>
                        <StyledTableCell>
                          <Box
                              sx={{
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                backgroundColor: statusStyles
                                  ? statusStyles.backgroundColor
                                  : "transparent",
                                height: "35px",
                                borderRadius: "8px",
                              }}
                            >
                              <Typography
                                sx={{
                                  fontSize: 13,
                                  fontWeight: 400,
                                  color: statusStyles
                                    ? statusStyles.color
                                    : "black",
                                }}
                              >
                               {item.trainCheck ? "Lolos" : "Tidak Tersedia"}
                              </Typography>
                            </Box>
                        </StyledTableCell>
                        <StyledTableCell>
                          <Box
                              sx={{
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                backgroundColor: statusStyles
                                  ? statusStyles.backgroundColor
                                  : "transparent",
                                height: "35px",
                                borderRadius: "8px",
                              }}
                            >
                              <Typography
                                sx={{
                                  fontSize: 13,
                                  fontWeight: 400,
                                  color: statusStyles
                                    ? statusStyles.color
                                    : "black",
                                }}
                              >
                               {item.handOver ? "Lolos" : "Tidak Tersedia"}
                              </Typography>
                            </Box>
                          
                        </StyledTableCell>
                        <StyledTableCell>
                          {
                            item.handOver && item.trainCheck ? 
                            <Button variant="outlined" onClick={() => handleView(item)}>
                              {
                              item?.trainJourneyLog? "Masuk" : "Naik Kabin"
                              }
                              </Button> :
                            <Typography>-</Typography>
                          }
                          
                        </StyledTableCell>
                      </StyledTableRow>
                    );
                  })}
                </>
              }
            />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

export default ListDinasanPage;
