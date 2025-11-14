import React, { useEffect, useState,useCallback,useContext } from 'react';
import { dataNavBar,dataFooter } from 'Routes/Data';

export default function UseSitemapHeader() {
  const [dataFooterSitemap, setDataFooterSitemap] = useState([])
  const [dataHeaderSitemap, setDataHeaderSitemap] = useState([])

  const fetchData = async (paramsSitemap) => {
    let dataTempParent = paramsSitemap.filter(item => item.parent === "Tanpa Parent");
    let dataTemp = dataTempParent.map(item => {
      item.branch = []
      paramsSitemap.map((val) => {
        if (item._id === val.parent) {
          item.branch = [...item.branch, val]
        }
      })
      return item
    })

    return dataTemp
  }

  const handleSetDataSitemap = async () => {
    const resultSitemapHeader = await fetchData(dataNavBar)
    const resultSitemapFooter = await fetchData(dataFooter)
    let headerSitemap = resultSitemapHeader.filter(item=> item.title !== "Pertandingan" && item.title !== "Info Lelang")
    setDataFooterSitemap(resultSitemapFooter.filter(item => item.position === "Header & Footer" || item.position === "Footer"))
    setDataHeaderSitemap(headerSitemap.filter(item => item.position === "Header & Footer" || item.position === "Header"))
  }

  const handleDropdownHeader = useCallback((index) => {
    let mergeData = dataHeaderSitemap.map((item, idx) => {
      item.setDropDown = !item.setDropDown && index === idx;
      return item;
    });
    setDataHeaderSitemap(mergeData);
    },
    [dataHeaderSitemap, setDataHeaderSitemap],
  );

  const handleDropdownHeaderClose = useCallback(() => {
    let mergeData = dataHeaderSitemap.map((item, idx) => {
      item.setDropDown = false;
      return item;
    });
    setDataHeaderSitemap(mergeData);
    },
    [dataHeaderSitemap, setDataHeaderSitemap],
  );

  useEffect(() => {
    handleSetDataSitemap();
  }, [dataNavBar,dataFooter])

  return {
    dataNavBar,
    dataFooterSitemap,
    dataHeaderSitemap,
    handleDropdownHeader,
    handleDropdownHeaderClose
  }
}