const dataPartner = [
    {
        title : "Kemenpora",
        logo : require("../../Assets/Images/logo_kemenpora.png")
    },
    {
        title : "Koni",
        logo : require("../../Assets/Images/logo_koni.png")
    },
    {
        title : "Pemprov Papua",
        logo : require("../../Assets/Images/logo_papua.png")
    },
]

const dataSocmed = [
    {
        title : "facebook",
        logo : require("../../Assets/Images/socmed/facebook.png"),
        link : "https://www.facebook.com/ponxx2020papua"
    },
    {
        title : "instagram",
        logo : require("../../Assets/Images/socmed/instagram.png"),
        link : "https://www.instagram.com/ponxx2020papua/"
    },
    {
        title : "tiktok",
        logo : require("../../Assets/Images/socmed/tiktok.png"),
        link : "https://www.tiktok.com/@ponxxpapua2021"
    },
    {
        title : "twitter",
        logo : require("../../Assets/Images/socmed/twitter.png"),
        link : "https://twitter.com/ponxx2020papua"
    },
    {
        title : "youtube",
        logo : require("../../Assets/Images/socmed/youtube.png"),
        link : "https://www.youtube.com/watch?v=vX6pRwOjZsE"
    }
]

const dataSitemap = [
    {
        title: "Berita & Galeri",
        link: "/",
        branch: [
            {
                title: "Berita",
                link: "/",
            },
            {
                title: "Galeri Foto",
                link: "/",
            },
            {
                title: "Galeri Video",
                link: "/",
            }
        ]
    },
    {
        title: "Pertandingan",
        link: "/",
        branch: [
            {
                title: "Jadwal & Hasil",
                link: "/",
            },
            {
                title: "Medali",
                link: "/",
            },
            {
                title: "Kontingen",
                link: "/",
            },
            {
                title: "Venue",
                link: "/",
            }
        ]
    },
    {
        title: "Layanan & Dukungan",
        link: "/service",
        branch:[
            {
              title: "Transportasi",
              link: "/",
            },
            {
              title: "Akomodasi",
              link: "/",
            },
            {
              title: "Konsumsi",
              link: "/",
            },
            {
                title: "Medis dan Anti Doping",
                link: "/",
            },
            {
                title: "IT, Penyiaran, dan Media",
                link: "/",
            },
            {
                title: "Sponsor",
                link: "/",
            },
            {
                title: "Keamanan",
                link: "/",
            },
            {
                title: "Kedatangan dan Kepulangan",
                link: "/",
            }
        ]
    },
    {
        title: "Pendaftaran",
        link: "/sports",
        branch:[
            {
              title: "Jadwal Pendaftaran",
              link: "/",
            },
            {
              title: "Sistem Layanan",
              link: "/",
            }
        ]
    },
    {
        title: "Ticket & Merch",
        link: "/guide",
        branch:[
            {
              title: "Tiket",
              link: "/",
            },
            {
              title: "Merchantdise",
              link: "/",
            }
        ]
    },
    {
        title: "Tentang PON XX",
        link: "/news",
        branch:[
            {
              title: "Informasi Umum",
              link: "/",
            },
            {
              title: "Handbook",
              link: "/",
            }
        ]
    }
];

export { dataSitemap,dataPartner, dataSocmed };
