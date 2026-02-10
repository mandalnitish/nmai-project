/* ==========================================================================
   UPDATED: Fixed image paths to work with /images/articles/ directory
   ========================================================================== */

// Date helper: Returns date based on page number (Feb 10, 2026 going backwards)
const getArticleDate = (pageNumber) => {
  const baseDate = new Date('2026-02-10');
  const daysToSubtract = pageNumber - 1;
  const articleDate = new Date(baseDate);
  articleDate.setDate(articleDate.getDate() - daysToSubtract);
  return articleDate;
};

/* ================= TAGS ================= */

const TAGS = {
  Economy: ["UPSC", "RBI", "Trade", "Growth"],
  Polity: ["Constitution", "Governance", "Federalism"],
  Science: ["Research", "Innovation", "Space"],
  Technology: ["AI", "Digital India"],
  Environment: ["Climate Change", "Biodiversity"],
  International: ["Diplomacy", "Geopolitics"],
  Social: ["Health", "Welfare"],
  Defence: ["Security", "Military"],
  Sports: ["Championship", "India"],
  Culture: ["Heritage", "Awards"],
  Geography: ["Disaster Management"],
  Health: ["Public Health"],
  Education: ["Institutions"],
  Energy: ["Renewables"],
  Infrastructure: ["Transport"],
  ExamUtility: ["UPSC", "SSC"]
};


   /* ================= IMAGE CDN MAP (Cloudinary) ================= */

const IMAGE_MAP = {
  
  default:
    "https://res.cloudinary.com/dyftyrehc/image/upload/v1770720000/nmai-articles/default.jpg",

  // PAGE 1

  "manu-bhaker-25m-pistol": "https://res.cloudinary.com/dyftyrehc/image/upload/v1770720657/nmai-articles/hnwxgrjplpvrjckl4w1n.jpg",
  "modi-seychelles-package": "https://res.cloudinary.com/dyftyrehc/image/upload/v1770720669/nmai-articles/nduhppu7qfdnymcj0f2b.jpg",
  "chandrayaan-4-south-pole": "https://res.cloudinary.com/dyftyrehc/image/upload/v1770720657/nmai-articles/duiutajylgzwphetyxtn.jpg",
  "delhi-bharat-taxi": "https://res.cloudinary.com/dyftyrehc/image/upload/v1770720657/nmai-articles/pl4lfln5gdhmksritu4z.jpg",
  "lyriothemis-keralensis": "https://res.cloudinary.com/dyftyrehc/image/upload/v1770720657/nmai-articles/qa0c7adimuuxsfl4ntv1.jpg",
  "kerala-judicial-disability": "https://res.cloudinary.com/dyftyrehc/image/upload/v1770720667/nmai-articles/zylnu0hg1cncsueuuh4c.jpg",
  "india-netherlands-hydrogen": "https://res.cloudinary.com/dyftyrehc/image/upload/v1770720657/nmai-articles/lya6uaud02970622ownx.jpg",
  "india-greece-defence-pact": "https://res.cloudinary.com/dyftyrehc/image/upload/v1770720657/nmai-articles/m7dttcpe6aa4zoeoykhl.jpg",
  "peru-new-frog-species": "https://res.cloudinary.com/dyftyrehc/image/upload/v1770720657/nmai-articles/zcyks1pkv9cjj4b1pdb8.jpg",
  "vijay-anandh-city-union-bank": "https://res.cloudinary.com/dyftyrehc/image/upload/v1770720657/nmai-articles/akxvyjhcrf9r7di89krd.jpg",
  "somalia-saudi-defence-pact": "https://res.cloudinary.com/dyftyrehc/image/upload/v1770720657/nmai-articles/wtscentqwqqvx8rrdm18.jpg",

  "nso-mcp-esankhyiki": "https://res.cloudinary.com/dyftyrehc/image/upload/v1770720673/nmai-articles/j5mvpljjjepv1puenp15.jpg",
  "marine-worms-west-bengal": "https://res.cloudinary.com/dyftyrehc/image/upload/v1770720669/nmai-articles/wkqyfwsyspuiuyhg5mrm.jpg",
  "ins-arnala-naval": "https://res.cloudinary.com/dyftyrehc/image/upload/v1770720657/nmai-articles/hloubmkgjw9hfozis4ni.jpg",
  "longest-snake-sulawesi": "https://res.cloudinary.com/dyftyrehc/image/upload/v1770720667/nmai-articles/kvmapio4kkjwufrzmi8m.png",
  "trapdoor-spider-kolhapur": "https://res.cloudinary.com/dyftyrehc/image/upload/v1770720659/nmai-articles/k2andkagcriuynxnjaw9.jpg",
  "sharda-river-corridor": "https://res.cloudinary.com/dyftyrehc/image/upload/v1770720659/nmai-articles/wkt4euywlqorho38zuhb.jpg",
  "kondaveedu-fort": "https://res.cloudinary.com/dyftyrehc/image/upload/v1770720659/nmai-articles/f0nwuz5wdo9ksforv6td.jpg",
  "kailash-yatra-shipki-la": "https://res.cloudinary.com/dyftyrehc/image/upload/v1770720667/nmai-articles/ykv2fmkwrbgpbjgl15ot.jpg",
  "ant-species-guwahati": "https://res.cloudinary.com/dyftyrehc/image/upload/v1770720659/nmai-articles/wqppok9csiaiopwnr2fw.jpg",
  "eurasian-otter-kashmir": "https://res.cloudinary.com/dyftyrehc/image/upload/v1770720659/nmai-articles/txtmkmnsgzw6ldwpcjqc.jpg",
  "epilepsy-day-2026": "https://res.cloudinary.com/dyftyrehc/image/upload/v1770720659/nmai-articles/y0trbftbfin5xuinaa5n.jpg",
  "saff-u19-women": "https://res.cloudinary.com/dyftyrehc/image/upload/v1770720659/nmai-articles/xywbp5mglcd68lvvikwy.jpg",
  "chess-esports-nations-cup": "https://res.cloudinary.com/dyftyrehc/image/upload/v1770720659/nmai-articles/ynkywibkkwyzqzxcgcdg.jpg",
  "wool-production-india": "https://res.cloudinary.com/dyftyrehc/image/upload/v1770720659/nmai-articles/sz0wyjvqmzuuwivmwdne.jpg",
  "padhai-with-ai": "https://res.cloudinary.com/dyftyrehc/image/upload/v1770720673/nmai-articles/hbqbmlu9uck4b7rjawdc.jpg",
  "azista-space-orbit": "https://res.cloudinary.com/dyftyrehc/image/upload/v1770720659/nmai-articles/vemrxwamnubxarjituhn.jpg",
  "thailand-election": "https://res.cloudinary.com/dyftyrehc/image/upload/v1770720659/nmai-articles/vw8lbsiqwvi5m73cdsxb.jpg",
  "japan-election": "https://res.cloudinary.com/dyftyrehc/image/upload/v1770720667/nmai-articles/ee7iezdz0i3uzeabkp66.jpg",
  "medicolegal-guidebook": "https://res.cloudinary.com/dyftyrehc/image/upload/v1770720670/nmai-articles/rvokxwuiqcpo8fzu7fnb.jpg",
  "queensland-ban": "https://res.cloudinary.com/dyftyrehc/image/upload/v1770720661/nmai-articles/jdfwrg2mu3gta86ey1da.jpg",
  "cbci-president": "https://res.cloudinary.com/dyftyrehc/image/upload/v1770720661/nmai-articles/mokeacyxmpbr6gkjna2x.jpg",
  "leed-green-realty": "https://res.cloudinary.com/dyftyrehc/image/upload/v1770720667/nmai-articles/fdhcq3dsebtaothnplzf.png",
  

  // PAGE 2

  "meghana-sajjanar-bronze": "https://res.cloudinary.com/dyftyrehc/image/upload/v1770720669/nmai-articles/f14hwqhb9kb7o1bjln1u.jpg",
  "india-us-trade-pact": "https://res.cloudinary.com/dyftyrehc/image/upload/v1770720660/nmai-articles/r7tfwk2wfpj2h8nvrssn.jpg",
  "rss-flag-march": "https://res.cloudinary.com/dyftyrehc/image/upload/v1770720660/nmai-articles/bgbr9s0ilqltnvlrfoh2.jpg",
  "cancer-cells-research": "https://res.cloudinary.com/dyftyrehc/image/upload/v1770720660/nmai-articles/fg7ezd25ko2ky1fdggb2.jpg",
  "south-africa-fmd-vaccine": "https://res.cloudinary.com/dyftyrehc/image/upload/v1770720660/nmai-articles/hfbbwmibu2smdervadlv.jpg",
  "pm-modi-malaysia": "https://res.cloudinary.com/dyftyrehc/image/upload/v1770720660/nmai-articles/ypj5kozm7ssagf6tzkvc.jpg",
  "forex-reserves": "https://res.cloudinary.com/dyftyrehc/image/upload/v1770720660/nmai-articles/v97fzh78jjbllrzvo14n.jpg",
  "us-tariffs-removal": "https://res.cloudinary.com/dyftyrehc/image/upload/v1770720660/nmai-articles/kon0nmq6ma7a1fwh8bhd.jpg",
  "voc-port-anti-drone": "https://res.cloudinary.com/dyftyrehc/image/upload/v1770720662/nmai-articles/ud1ycgb6sd3bakrhtjah.jpg",
  

  // PAGE 3

  "rcb-wpl-title": "https://res.cloudinary.com/dyftyrehc/image/upload/v1770720662/nmai-articles/yeu3dfclyuanyqduygdk.jpg",
  "surajkund-crafts-mela": "https://res.cloudinary.com/dyftyrehc/image/upload/v1770720662/nmai-articles/oigojdzxwqgxzlx4kqhe.jpg",
  "operation-shastra": "https://res.cloudinary.com/dyftyrehc/image/upload/v1770720673/nmai-articles/tp5mwgn7qjm3tswaa50c.jpg",
  "india-u19-world-cup": "https://res.cloudinary.com/dyftyrehc/image/upload/v1770720662/nmai-articles/v6x2ylac82pl6sobrvnk.jpg",
  "nasa-spherex-comet": "https://res.cloudinary.com/dyftyrehc/image/upload/v1770720673/nmai-articles/zxlbrgfoaspphivquagj.jpg",
  "rbi-repo-rate": "https://res.cloudinary.com/dyftyrehc/image/upload/v1770720662/nmai-articles/uv7hbkwjw8wn9ku6lld1.jpg",
  "end-fgm": "https://res.cloudinary.com/dyftyrehc/image/upload/v1770720662/nmai-articles/alcluqoxlzc7ki2rnjtb.jpg",
  "alwar-insurance": "https://res.cloudinary.com/dyftyrehc/image/upload/v1770720662/nmai-articles/xshvrabjsuwjmpl2fgvm.jpg",
  "chabahar-port": "https://res.cloudinary.com/dyftyrehc/image/upload/v1770720662/nmai-articles/hwejnhwhv1lfz6msmeg9.jpg",
  "age-of-consent": "https://res.cloudinary.com/dyftyrehc/image/upload/v1770720662/nmai-articles/hyhjzesfscvjjahh5p9i.jpg",


  // PAGE 4

  "goa-bird-atlas": "https://res.cloudinary.com/dyftyrehc/image/upload/v1770720663/nmai-articles/vrokzrnvgj7ev8z4vp6y.jpg",
  "delhi-pollution": "https://res.cloudinary.com/dyftyrehc/image/upload/v1770720664/nmai-articles/jaqjbmy6faxcfbg4yxmq.jpg",
  "arun-icecreams-guinness": "https://res.cloudinary.com/dyftyrehc/image/upload/v1770720664/nmai-articles/op2ygck32eq1p3my0skt.jpg",
  "amaravati-quantum-valley": "https://res.cloudinary.com/dyftyrehc/image/upload/v1770720664/nmai-articles/qykamps6vv9avx6jkb0s.jpg",
  "china-rare-earth": "https://res.cloudinary.com/dyftyrehc/image/upload/v1770720664/nmai-articles/vard5oqsegew8dzz5yqv.jpg",
  "agni-iii-missile": "https://res.cloudinary.com/dyftyrehc/image/upload/v1770720664/nmai-articles/ceqmdmi7be7kpmo3qvwq.jpg",
  "tamil-nadu-greening": "https://res.cloudinary.com/dyftyrehc/image/upload/v1770720664/nmai-articles/lvlz7orqzbnbxdxpwaol.jpg",
  "iran-ioc-female": "https://res.cloudinary.com/dyftyrehc/image/upload/v1770720664/nmai-articles/xyxhz8uf4jyjprq1brfp.jpg",
  "bhutan-queen-award": "https://res.cloudinary.com/dyftyrehc/image/upload/v1770720664/nmai-articles/rmdzfpgbcgwlhbzshg5l.jpg",
  "karnataka-ballot-papers": "https://res.cloudinary.com/dyftyrehc/image/upload/v1770720668/nmai-articles/qodlnawovjluxnzlxs1p.jpg",


  // PAGE 5

  "project-vault-trump": "https://res.cloudinary.com/dyftyrehc/image/upload/v1770720664/nmai-articles/oiitk79t8ivivmhjmrnz.jpg",
  "hakki-pikki-tribe": "https://res.cloudinary.com/dyftyrehc/image/upload/v1770720664/nmai-articles/tylduz0vmdkfcgyewsj7.jpg",
  "chichon-volcano": "https://res.cloudinary.com/dyftyrehc/image/upload/v1770720665/nmai-articles/uuuj3twab6kzjmdxszpc.jpg",
  "rbi-repo-rate-budget": "https://res.cloudinary.com/dyftyrehc/image/upload/v1770720665/nmai-articles/ebp8lqjqulmpkowclo0p.jpg",
  "india-gcc-trade": "https://res.cloudinary.com/dyftyrehc/image/upload/v1770720665/nmai-articles/fmbug83w3gbypdoenqit.jpg",
  "isro-gisat-1a": "https://res.cloudinary.com/dyftyrehc/image/upload/v1770720667/nmai-articles/w9woprztotsclql5sgta.jpg",
  "manipur-deputy-cm": "https://res.cloudinary.com/dyftyrehc/image/upload/v1770720669/nmai-articles/maqqhxukioyx8ddi5jbo.jpg",
  "pakhal-plant-species": "https://res.cloudinary.com/dyftyrehc/image/upload/v1770720673/nmai-articles/noinxsrkfvhhak9o8410.jpg",
  "heart-attack-biosensor": "https://res.cloudinary.com/dyftyrehc/image/upload/v1770720665/nmai-articles/qwltqf6cfbjxatur66ol.jpg",
  "dubai-loop": "https://res.cloudinary.com/dyftyrehc/image/upload/v1770720665/nmai-articles/yjorbgtyacnrusvl8yuo.jpg",


  // PAGE 6

  "lead-free-photodetector": "https://res.cloudinary.com/dyftyrehc/image/upload/v1770720667/nmai-articles/t0w2h1apnru55avot5ci.jpg",
  "railways-ai-elephant": "https://res.cloudinary.com/dyftyrehc/image/upload/v1770720665/nmai-articles/lkcgbuwyuptapa8qv8bh.jpg",
  "esha-singh-gold": "https://res.cloudinary.com/dyftyrehc/image/upload/v1770720665/nmai-articles/ummjipiia8twbbac9lie.jpg",
  "rouble-nagi-teacher-prize": "https://res.cloudinary.com/dyftyrehc/image/upload/v1770720665/nmai-articles/ur6f7fscs9kqx4nzvo6r.jpg",
  "suruchi-samrat-silver": "https://res.cloudinary.com/dyftyrehc/image/upload/v1770720665/nmai-articles/f37j645najf8zquvdyeu.jpg",
  "bharat-taxi": "https://res.cloudinary.com/dyftyrehc/image/upload/v1770720665/nmai-articles/qzyoiocqoa09rl3fwka9.jpg",
  "exercise-khanjar": "https://res.cloudinary.com/dyftyrehc/image/upload/v1770720667/nmai-articles/w9woprztotsclql5sgta.jpg",
  "us-baltic-security": "https://res.cloudinary.com/dyftyrehc/image/upload/v1770720667/nmai-articles/ee7iezdz0i3uzeabkp66.jpg",
  "karnataka-property-mutation": "https://res.cloudinary.com/dyftyrehc/image/upload/v1770720667/nmai-articles/osewjtacfcn7nnndqrpx.jpg",
  "ncdc-schemes": "https://res.cloudinary.com/dyftyrehc/image/upload/v1770720673/nmai-articles/uygfhngjtqlwgcdjhts9.jpg",
  "brics-industrial": "https://res.cloudinary.com/dyftyrehc/image/upload/v1770720673/nmai-articles/gimptxwo1u23xkkzbpo8.jpg",
  "eci-conference": "https://res.cloudinary.com/dyftyrehc/image/upload/v1770720673/nmai-articles/j5mvpljjjepv1puenp15.jpg",
  "paradip-swachhata": "https://res.cloudinary.com/dyftyrehc/image/upload/v1770720673/nmai-articles/esaj4bqbyrxqhrdwgqeg.jpg",
  "bharat-rang-mahotsav": "https://res.cloudinary.com/dyftyrehc/image/upload/v1770720673/nmai-articles/hbqbmlu9uck4b7rjawdc.jpg",
  "seychelles-president": "https://res.cloudinary.com/dyftyrehc/image/upload/v1770720675/nmai-articles/ulyfprbuaseao7rbrvgh.jpg",

  // PAGE 7

  "nasa-jupiter-juno": "https://res.cloudinary.com/dyftyrehc/image/upload/v1770720673/nmai-articles/aw3b6rfzcs9deuuvnw4b.jpg",
  "andre-beteille": "https://res.cloudinary.com/dyftyrehc/image/upload/v1770720673/nmai-articles/zxlbrgfoaspphivquagj.jpg",
  "milano-cortina-skiing": "https://res.cloudinary.com/dyftyrehc/image/upload/v1770720673/nmai-articles/uygfhngjtqlwgcdjhts9.jpg",
  "lung-cancer-guidelines": "https://res.cloudinary.com/dyftyrehc/image/upload/v1770720669/nmai-articles/lk98tlehpvgrpbrm6yge.jpg",
  "elon-musk-800b": "https://res.cloudinary.com/dyftyrehc/image/upload/v1770720669/nmai-articles/nv7zbbygpcqp1pdt18ej.jpg",
  "india-china-trade": "https://res.cloudinary.com/dyftyrehc/image/upload/v1770720669/nmai-articles/nduhppu7qfdnymcj0f2b.jpg",
  "world-govt-summit": "https://res.cloudinary.com/dyftyrehc/image/upload/v1770720675/nmai-articles/o1adrzjo6sdhmkodgrxq.jpg",
  "kamakhya-ropeway": "https://res.cloudinary.com/dyftyrehc/image/upload/v1770720667/nmai-articles/wu063tafttmhmkjbygjk.jpg",
  "badminton-asia": "https://res.cloudinary.com/dyftyrehc/image/upload/v1770720675/nmai-articles/ja1jhtmrvdgu7iysx7qv.jpg",
  "drdo-sfdr-missile": "https://res.cloudinary.com/dyftyrehc/image/upload/v1770720680/nmai-articles/kjxppz3dog1taawsluy4.jpg",
  "devnimori-relics": "https://res.cloudinary.com/dyftyrehc/image/upload/v1770720680/nmai-articles/cr89ejnyx8eartp0f5tx.jpg",
  "moltbook-ai": "https://res.cloudinary.com/dyftyrehc/image/upload/v1770720669/nmai-articles/pr078didbbzaai1vncjk.jpg",

// PAGE 8

  "neophyteid-app": "https://res.cloudinary.com/dyftyrehc/image/upload/v1770720673/nmai-articles/gimptxwo1u23xkkzbpo8.jpg",
  "volcan-de-fuego": "https://res.cloudinary.com/dyftyrehc/image/upload/v1770720675/nmai-articles/jl6jg2rcr6mwsruniwqn.jpg",
  "saksham-2026": "https://res.cloudinary.com/dyftyrehc/image/upload/v1770720675/nmai-articles/qzzrzrht789w9r6nysxf.jpg",
  "bharat-container-shipping": "https://res.cloudinary.com/dyftyrehc/image/upload/v1770720675/nmai-articles/xz6suwwpa5tjqxutgaoh.jpg",
  "vinay-tonse-yes-bank": "https://res.cloudinary.com/dyftyrehc/image/upload/v1770720675/nmai-articles/imphcj0dt9fq9ngfdc6p.jpg",
  "walmart-1-trillion": "https://res.cloudinary.com/dyftyrehc/image/upload/v1770720675/nmai-articles/cqzywiuqnf2ywt7vmh7j.jpg",
  "spain-social-media-ban": "https://res.cloudinary.com/dyftyrehc/image/upload/v1770720675/nmai-articles/j0txe4x88irmexne38o7.jpg",
  "manipur-cm": "https://res.cloudinary.com/dyftyrehc/image/upload/v1770720670/nmai-articles/ufdx9jnbxqssmogx3kdq.jpg",
  "yuki-bhambri-atp": "https://res.cloudinary.com/dyftyrehc/image/upload/v1770720680/nmai-articles/qyttf53htcir9r9aa1ce.jpg",
  "sp-venkatesh": "https://res.cloudinary.com/dyftyrehc/image/upload/v1770720680/nmai-articles/onn2pbhxi2wszlhjzxlp.jpg",

// PAGE 9

  "haven-1-space-station": "https://res.cloudinary.com/dyftyrehc/image/upload/v1770720680/nmai-articles/xdx77ataanwoqfo1n3ox.jpg",
  "gandhi-statue-australia": "https://res.cloudinary.com/dyftyrehc/image/upload/v1770720680/nmai-articles/bo7on4kttgzhxd1dlczu.jpg",
  "iim-digital-conclave": "https://res.cloudinary.com/dyftyrehc/image/upload/v1770720680/nmai-articles/oaogvwqil120gx43w0vz.jpg",
  "seafood-congress": "https://res.cloudinary.com/dyftyrehc/image/upload/v1770720680/nmai-articles/cjnddoinukdahdjwkpiw.jpg",
  "solar-flare-x8": "https://res.cloudinary.com/dyftyrehc/image/upload/v1770720680/nmai-articles/nsciv0sk3n5jgrlardqg.jpg",
  "anahat-singh-squash": "https://res.cloudinary.com/dyftyrehc/image/upload/v1770720680/nmai-articles/wr7njhi6usiqcleyfqvi.jpg",
  "india-us-tariffs": "https://res.cloudinary.com/dyftyrehc/image/upload/v1770720681/nmai-articles/onpm8uibvsaymsjkfykr.jpg",
  "dalai-lama-grammy": "https://res.cloudinary.com/dyftyrehc/image/upload/v1770720681/nmai-articles/nfnlfzvoxdjhcaqwsgdl.jpg",
  "ramanathan-nobel": "https://res.cloudinary.com/dyftyrehc/image/upload/v1770720681/nmai-articles/ocfhxyjezowbrf6g2yiq.jpg",

// PAGE 10

  "census-2027-digital": "https://res.cloudinary.com/dyftyrehc/image/upload/v1770720681/nmai-articles/tqtztdpmhslogsooyc94.jpg",
  "supercapacitor": "https://res.cloudinary.com/dyftyrehc/image/upload/v1770720681/nmai-articles/hdszqh7xnixami2xdrdi.jpg",
  "ai-impact-summit": "https://res.cloudinary.com/dyftyrehc/image/upload/v1770720681/nmai-articles/ooxkbrto5hfcjwtkle1r.jpg",
  "migration-survey": "https://res.cloudinary.com/dyftyrehc/image/upload/v1770720669/nmai-articles/oomyaslk8nxc1kijwwg4.jpg",
  "pennaiyar-tribunal": "https://res.cloudinary.com/dyftyrehc/image/upload/v1770720681/nmai-articles/qkbonkc7quicmuygygmn.jpg",
  "gyan-bharatam": "https://res.cloudinary.com/dyftyrehc/image/upload/v1770720681/nmai-articles/eolbfbs8xevr1qwy6ozo.jpg",
  "gujarat-renewable": "https://res.cloudinary.com/dyftyrehc/image/upload/v1770720681/nmai-articles/nws9isyuwptgbhn3npwc.jpg",
  "pilloo-ai-app": "https://res.cloudinary.com/dyftyrehc/image/upload/v1770720681/nmai-articles/ymiovubdu5b7oi7jatvn.jpg",
  "ibc-amendment": "https://res.cloudinary.com/dyftyrehc/image/upload/v1770720683/nmai-articles/chsqwsco76lx53yjy8n0.jpg",

// PAGE 11

  "ai-summit-global": "https://res.cloudinary.com/dyftyrehc/image/upload/v1770720683/nmai-articles/ecm63tipncl0ograhlbd.jpg",
  "nso-migration-policy": "https://res.cloudinary.com/dyftyrehc/image/upload/v1770720673/nmai-articles/nn6zdsrwjxlb5ixsj56d.jpg",
  "pennaiyar-dispute": "https://res.cloudinary.com/dyftyrehc/image/upload/v1770720682/nmai-articles/qyypzalxldjbjyd7zvoe.jpg",
  "gyan-bharatam-mission": "https://res.cloudinary.com/dyftyrehc/image/upload/v1770720682/nmai-articles/rfew4ks08uvv3iebpphx.jpg",
  "gujarat-energy-leader": "https://res.cloudinary.com/dyftyrehc/image/upload/v1770720682/nmai-articles/vhlrjyhwzlyagobfqjgd.jpg",
  "ap-ai-accounting": "https://res.cloudinary.com/dyftyrehc/image/upload/v1770720679/nmai-articles/hpltpsydug4p7kanqu6y.jpg",
  "ibc-amendment-proposed": "https://res.cloudinary.com/dyftyrehc/image/upload/v1770720675/nmai-articles/jl6jg2rcr6mwsruniwqn.jpg",

};


/* ================= INDIVIDUAL ARTICLE CONTENT ================= */

const ARTICLE_CONTENT = {
   

   "Manu Bhaker Wins Silver in Asian Championship 25m Pistol": {
  introduction: `Olympic double bronze medallist Manu Bhaker won the silver medal in the women’s 25m pistol event at the Asian Shooting Championship after a tense shoot-off.`,
  keyHighlights: [
    { label: "Athlete", value: "Manu Bhaker" },
    { label: "Event", value: "Asian Shooting Championship" },
    { label: "Discipline", value: "25m Pistol" }
  ],
  sections: [
    {
      heading: "Competition Overview",
      content: `The final witnessed intense competition with Bhaker narrowly missing gold.`
    },
    {
      heading: "India’s Shooting Strength",
      content: `India continues to dominate Asian shooting events across categories.`
    }
  ],
  examPerspective: {
    points: [
      "Indian sports achievements",
      "Shooting disciplines",
      "Olympic preparation"
    ]
  },
  keyTakeaways: [
    "Silver medal at Asian level",
    "Olympic medallist continues strong form",
    "Boost for Indian shooting"
  ],
  sources: ["Asian Shooting Confederation"]
},

"Modi Announces $175 Million Seychelles Development Package": {
  introduction: `Prime Minister Narendra Modi announced a $175 million development assistance package for Seychelles following bilateral talks in New Delhi.`,
  keyHighlights: [
    { label: "Amount", value: "$175 Million" },
    { label: "Country", value: "Seychelles" },
    { label: "Theme", value: "Development cooperation" }
  ],
  sections: [
    {
      heading: "Key Areas of Assistance",
      content: `Includes infrastructure, health, education, and capacity building.`
    },
    {
      heading: "Strategic Importance",
      content: `Strengthens India’s presence in the Indian Ocean Region (IOR).`
    }
  ],
  examPerspective: {
    points: [
      "India–Africa relations",
      "Indian Ocean diplomacy",
      "Development assistance"
    ]
  },
  keyTakeaways: [
    "Major aid package announced",
    "Strengthens IOR engagement",
    "Enhances strategic partnership"
  ],
  sources: ["MEA"]
},

"ISRO Selects South Polar Site for Chandrayaan-4 Lander": {
  introduction: `ISRO has identified a precise south polar landing site on the Moon for its upcoming Chandrayaan-4 mission.`,
  keyHighlights: [
    { label: "Mission", value: "Chandrayaan-4" },
    { label: "Agency", value: "ISRO" },
    { label: "Location", value: "Lunar South Pole" }
  ],
  sections: [
    {
      heading: "Why South Pole?",
      content: `The region is rich in water ice and critical for future lunar exploration.`
    },
    {
      heading: "Mission Significance",
      content: `Chandrayaan-4 aims to advance lunar sample return capabilities.`
    }
  ],
  examPerspective: {
    points: [
      "India’s lunar missions",
      "Space technology",
      "Planetary exploration"
    ]
  },
  keyTakeaways: [
    "Landing site finalized",
    "Boosts lunar research",
    "Strategic space milestone"
  ],
  sources: ["ISRO"]
},

"Delhi Partners Bharat Taxi for Cooperative Mobility Services": {
  introduction: `Delhi has partnered with Bharat Taxi’s cooperative mobility platform to reorganize urban taxi services.`,
  keyHighlights: [
    { label: "Partner", value: "Bharat Taxi" },
    { label: "State", value: "Delhi" },
    { label: "Sector", value: "Urban transport" }
  ],
  sections: [
    {
      heading: "What is Cooperative Mobility?",
      content: `Drivers operate as members rather than gig workers.`
    },
    {
      heading: "Urban Impact",
      content: `Improves driver welfare and fare transparency.`
    }
  ],
  examPerspective: {
    points: [
      "Urban transport reforms",
      "Cooperative economy",
      "Gig economy alternatives"
    ]
  },
  keyTakeaways: [
    "First state partnership",
    "Driver-centric model",
    "Urban mobility reform"
  ],
  sources: ["Delhi Government"]
},

"New Dragonfly Species Lyriothemis keralensis Discovered in Kerala": {
  introduction: `Scientists have discovered a new dragonfly species, Lyriothemis keralensis, in coastal Kerala.`,
  keyHighlights: [
    { label: "Species", value: "Lyriothemis keralensis" },
    { label: "Location", value: "Kerala" },
    { label: "Category", value: "Biodiversity" }
  ],
  sections: [
    {
      heading: "Scientific Importance",
      content: `Adds to India’s documented odonate diversity.`
    },
    {
      heading: "Ecological Indicator",
      content: `Dragonflies indicate freshwater ecosystem health.`
    }
  ],
  examPerspective: {
    points: [
      "Species discovery",
      "Biodiversity hotspots",
      "Environmental conservation"
    ]
  },
  keyTakeaways: [
    "New species discovered",
    "Highlights Kerala biodiversity",
    "Supports conservation efforts"
  ],
  sources: ["Zoological Survey of India"]
},

"Visually Challenged Woman Tops Kerala Judicial Service Disability Merit List": {
  introduction: `Thanya Nathan C. has become the first totally visually impaired woman to top Kerala Judicial Service’s disability merit list.`,
  keyHighlights: [
    { label: "Individual", value: "Thanya Nathan C." },
    { label: "State", value: "Kerala" },
    { label: "Milestone", value: "Judicial inclusion" }
  ],
  sections: [
    {
      heading: "Historic Achievement",
      content: `Marks a breakthrough in inclusive justice.`
    },
    {
      heading: "Social Significance",
      content: `Strengthens rights of persons with disabilities.`
    }
  ],
  examPerspective: {
    points: [
      "Disability inclusion",
      "Judicial reforms",
      "Social justice"
    ]
  },
  keyTakeaways: [
    "Historic first",
    "Promotes inclusivity",
    "Judicial empowerment"
  ],
  sources: ["Kerala PSC"]
},

"Daily Current Affairs Quiz: February 10, 2026": {
  introduction: `Daily Current Affairs Quiz for February 10, 2026 tests awareness of recent national and international developments.`,
  keyHighlights: [
    { label: "Type", value: "Quiz" },
    { label: "Date", value: "February 10, 2026" }
  ],
  sections: [
    {
      heading: "Purpose",
      content: `Helps aspirants revise daily current affairs efficiently.`
    }
  ],
  examPerspective: {
    points: [
      "UPSC prelims practice",
      "Daily revision",
      "MCQ-based learning"
    ]
  },
  keyTakeaways: [
    "Daily revision tool",
    "Exam-oriented questions"
  ],
  sources: ["Editorial Compilation"]
},

"India, Netherlands Launch Hydrogen Fellowship, Expand Research Ties": {
  introduction: `India and the Netherlands launched a Hydrogen Fellowship Programme to strengthen clean energy research cooperation.`,
  keyHighlights: [
    { label: "Countries", value: "India & Netherlands" },
    { label: "Focus", value: "Green Hydrogen" }
  ],
  sections: [
    {
      heading: "Programme Scope",
      content: `Supports academic exchange and joint research.`
    },
    {
      heading: "Climate Importance",
      content: `Accelerates clean energy transition.`
    }
  ],
  examPerspective: {
    points: [
      "Green hydrogen",
      "International research collaboration",
      "Energy diplomacy"
    ]
  },
  keyTakeaways: [
    "Clean energy partnership",
    "Academic collaboration",
    "Climate action support"
  ],
  sources: ["MEA"]
},

"India, Greece Sign Pact to Boost Defence Industry Ties": {
  introduction: `India and Greece signed a declaration of intent to enhance defence industrial collaboration.`,
  keyHighlights: [
    { label: "Countries", value: "India & Greece" },
    { label: "Sector", value: "Defence industry" }
  ],
  sections: [
    {
      heading: "Areas of Cooperation",
      content: `Joint production, technology transfer, and training.`
    },
    {
      heading: "Strategic Impact",
      content: `Strengthens Mediterranean outreach.`
    }
  ],
  examPerspective: {
    points: [
      "Defence diplomacy",
      "Strategic partnerships",
      "Make in India defence"
    ]
  },
  keyTakeaways: [
    "Defence ties strengthened",
    "Industrial cooperation",
    "Strategic alignment"
  ],
  sources: ["Defence Ministry"]
},

"New Frog Species Found in Peru Faces Immediate Threat": {
  introduction: `A newly discovered frog species in Peru’s cloud forests is already facing extinction threats.`,
  keyHighlights: [
    { label: "Location", value: "Peru" },
    { label: "Issue", value: "Biodiversity loss" }
  ],
  sections: [
    {
      heading: "Threats",
      content: `Habitat loss and climate change endanger the species.`
    }
  ],
  examPerspective: {
    points: [
      "Global biodiversity",
      "Climate threats",
      "Species conservation"
    ]
  },
  keyTakeaways: [
    "New species discovered",
    "Immediate conservation need"
  ],
  sources: ["Scientific Journals"]
},

"RBI Approves Vijay Anandh as City Union Bank CEO": {
  introduction: `RBI has approved R Vijay Anandh as MD & CEO of City Union Bank.`,
  keyHighlights: [
    { label: "Bank", value: "City Union Bank" },
    { label: "Regulator", value: "RBI" }
  ],
  sections: [
    {
      heading: "Banking Governance",
      content: `Leadership continuity supports financial stability.`
    }
  ],
  examPerspective: {
    points: [
      "Banking regulation",
      "Role of RBI"
    ]
  },
  keyTakeaways: [
    "CEO appointment approved",
    "Strengthens governance"
  ],
  sources: ["RBI"]
},

"Somalia–Saudi Defence Pact Deepens Gulf Rivalries": {
  introduction: `Somalia’s new defence pact with Saudi Arabia has intensified geopolitical competition in the Horn of Africa.`,
  keyHighlights: [
    { label: "Countries", value: "Somalia & Saudi Arabia" },
    { label: "Region", value: "Horn of Africa" }
  ],
  sections: [
    {
      heading: "Geopolitical Context",
      content: `Reflects growing Gulf influence in Africa.`
    }
  ],
  examPerspective: {
    points: [
      "West Asia geopolitics",
      "Horn of Africa",
      "Defence diplomacy"
    ]
  },
  keyTakeaways: [
    "Defence pact signed",
    "Regional power shifts"
  ],
  sources: ["International Affairs Reports"]
},

  "NSO Launches MCP Server for eSankhyiki Portal": {
    introduction: `The National Statistical Office (NSO) has launched an MCP (Model Context Protocol) Server for the eSankhyiki Portal, marking a significant advancement in India's statistical data infrastructure and digital governance framework.`,
    
    keyHighlights: [
      { label: "Organization", value: "National Statistical Office (NSO)" },
      { label: "Initiative", value: "MCP Server for eSankhyiki Portal" },
      { label: "Significance", value: "Enhanced data accessibility and statistical analysis" },
      { label: "Impact", value: "Improved data-driven policy making" }
    ],
    
    sections: [
      {
        heading: "About eSankhyiki Portal",
        content: `eSankhyiki is India's official statistical portal that provides access to official statistics on various socio-economic indicators. It serves as a one-stop platform for statistical data dissemination.`
      },
      {
        heading: "What is MCP Server?",
        content: `Model Context Protocol (MCP) Server is an advanced technology framework that enables better data integration, real-time statistical analysis, and improved user interaction with large datasets. It facilitates seamless data exchange between different statistical systems.`
      },
      {
        heading: "Key Features",
        content: `The MCP Server enables:
        <ul>
          <li>Real-time data processing and analysis</li>
          <li>Enhanced data security and integrity</li>
          <li>Improved user interface for data visualization</li>
          <li>Integration with AI/ML tools for advanced analytics</li>
          <li>Better interoperability with other government databases</li>
        </ul>`
      },
      {
        heading: "Significance for Policy Making",
        content: `This technological upgrade will enable policymakers, researchers, and citizens to access and analyze statistical data more efficiently, leading to better evidence-based policy formulation and implementation.`
      },
      {
        heading: "About National Statistical Office (NSO)",
        content: `NSO is the nodal agency for planned development of the statistical system in India. It functions under the Ministry of Statistics and Programme Implementation (MoSPI). NSO conducts various surveys including Census, National Sample Survey, and Annual Survey of Industries.`
      }
    ],
    
    examPerspective: {
      points: [
        "Understand NSO's role in India's statistical system",
        "Know about digital governance initiatives",
        "MCP technology and its applications",
        "Data-driven governance and policy making",
        "Connection with Digital India mission"
      ]
    },
    
    practiceQuestions: [
      { 
        type: "Mains", 
        question: "Discuss the significance of the MCP Server launch for eSankhyiki Portal in the context of data-driven governance in India. How does it align with Digital India objectives?" 
      },
      { 
        type: "Mains", 
        question: "Examine the role of National Statistical Office in India's statistical infrastructure. Analyze the challenges in statistical data management and how technological interventions can address them." 
      },
      { 
        type: "Prelims", 
        question: "Which ministry does the National Statistical Office (NSO) function under? What are the major surveys conducted by NSO?" 
      }
    ],
    
    keyTakeaways: [
      "NSO launched MCP Server for eSankhyiki Portal",
      "Enhances statistical data accessibility and analysis",
      "Part of digital governance and Digital India initiative",
      "Enables evidence-based policy formulation",
      "NSO functions under MoSPI"
    ],
    
    sources: ["PIB", "MoSPI Official Website", "eSankhyiki Portal"]
  },

  "Two New Marine Worm Species Discovered off West Bengal Coast": {
  introduction: `Scientists have discovered two new species of marine polychaete worms off the coast of West Bengal, highlighting India's rich yet underexplored marine biodiversity.`,
  
  keyHighlights: [
    { label: "Location", value: "West Bengal Coast, Bay of Bengal" },
    { label: "Discovery", value: "Two new marine worm (polychaete) species" },
    { label: "Institution", value: "Indian marine research teams" },
    { label: "Significance", value: "Strengthens marine biodiversity documentation" }
  ],
  
  sections: [
    {
      heading: "About Polychaete Worms",
      content: `Polychaetes are segmented marine worms belonging to the annelid group. They play a crucial role in marine ecosystems by recycling nutrients and supporting the food chain.`
    },
    {
      heading: "Details of the Discovery",
      content: `The newly identified species were found during coastal biodiversity surveys along the Bay of Bengal. Advanced taxonomic and molecular techniques were used to confirm their novelty.`
    },
    {
      heading: "Ecological Importance",
      content: `Marine worms help maintain sediment quality, oxygenation of seabeds, and serve as food for fish and crustaceans. Their presence indicates ecosystem health.`
    },
    {
      heading: "Why This Discovery Matters",
      content: `The finding underlines the need for sustained marine research and conservation, especially as coastal ecosystems face threats from pollution, climate change, and habitat destruction.`
    }
  ],
  
  examPerspective: {
    points: [
      "Marine biodiversity of India",
      "Bay of Bengal ecosystem",
      "Role of taxonomy in conservation",
      "Impact of climate change on coastal fauna"
    ]
  },
  
  practiceQuestions: [
    {
      type: "Mains",
      question: "Discuss the significance of recent marine species discoveries along the Indian coastline. How do they contribute to biodiversity conservation?"
    },
    {
      type: "Prelims",
      question: "Polychaete worms are primarily found in which environment?"
    }
  ],
  
  keyTakeaways: [
    "Two new marine worm species discovered off West Bengal",
    "Highlights India's underexplored marine biodiversity",
    "Supports the need for coastal conservation"
  ],
  
  sources: ["Zoological Survey of India", "Marine Biology Journals"]
},

"INS Arnala Strengthens India's Indigenous Naval Capability": {
  introduction: `INS Arnala, an indigenously built naval vessel, marks another milestone in India's pursuit of self-reliance in defence manufacturing under the Atmanirbhar Bharat initiative.`,
  
  keyHighlights: [
    { label: "Vessel", value: "INS Arnala" },
    { label: "Built By", value: "Indian Shipyards" },
    { label: "Sector", value: "Defence – Navy" },
    { label: "Objective", value: "Enhancing coastal and maritime security" }
  ],
  
  sections: [
    {
      heading: "About INS Arnala",
      content: `INS Arnala is designed for coastal surveillance, patrol, and maritime security operations, strengthening India's naval presence in the Indian Ocean Region.`
    },
    {
      heading: "Indigenous Defence Manufacturing",
      content: `The vessel reflects India's growing defence manufacturing ecosystem and reduced dependence on foreign suppliers.`
    },
    {
      heading: "Strategic Importance",
      content: `With increasing maritime challenges, indigenous naval platforms enhance rapid response, deterrence, and regional stability.`
    }
  ],
  
  examPerspective: {
    points: [
      "Atmanirbhar Bharat in defence",
      "Role of Indian Navy in maritime security",
      "Indigenous shipbuilding capabilities"
    ]
  },
  
  practiceQuestions: [
    {
      type: "Mains",
      question: "Evaluate the importance of indigenous naval vessels like INS Arnala in strengthening India’s maritime security."
    }
  ],
  
  keyTakeaways: [
    "INS Arnala boosts indigenous naval strength",
    "Supports self-reliance in defence",
    "Enhances coastal security"
  ],
  
  sources: ["Ministry of Defence", "Indian Navy"]
},


"World's Longest Snake Recorded in Sulawesi, Indonesia": {
  introduction: `Researchers have recorded the world's longest snake specimen in Sulawesi, Indonesia, adding valuable data to global wildlife and reptile studies.`,
  
  keyHighlights: [
    { label: "Species", value: "Reticulated Python" },
    { label: "Location", value: "Sulawesi, Indonesia" },
    { label: "Record", value: "Longest documented snake" }
  ],
  
  sections: [
    {
      heading: "About Reticulated Pythons",
      content: `Reticulated pythons are among the largest snake species, commonly found in Southeast Asia and known for their impressive length.`
    },
    {
      heading: "Scientific Significance",
      content: `Such records help scientists understand species growth patterns, habitat suitability, and conservation needs.`
    },
    {
      heading: "Human–Wildlife Interface",
      content: `The discovery also highlights the growing interactions between wildlife habitats and human settlements.`
    }
  ],
  
  examPerspective: {
    points: [
      "Biodiversity hotspots of Southeast Asia",
      "Wildlife conservation challenges",
      "Human–animal conflict"
    ]
  },
  
  keyTakeaways: [
    "World’s longest snake recorded in Indonesia",
    "Highlights importance of wildlife research",
    "Raises conservation awareness"
  ],
  
  sources: ["Wildlife Research Reports"]
},


"New Trapdoor Spider Species Found in Kolhapur Grasslands": {
  introduction: `A new species of trapdoor spider has been discovered in the grasslands of Kolhapur, Maharashtra, enriching India's arachnid biodiversity.`,
  keyHighlights: [
    { label: "Location", value: "Kolhapur, Maharashtra" },
    { label: "Species", value: "Trapdoor spider" },
    { label: "Habitat", value: "Grasslands" }
  ],
  sections: [
    {
      heading: "About Trapdoor Spiders",
      content: `Trapdoor spiders are burrowing spiders known for their camouflaged nests.`
    },
    {
      heading: "Importance of Grasslands",
      content: `Grasslands are often overlooked ecosystems but host unique biodiversity.`
    },
    {
      heading: "Conservation Angle",
      content: `The discovery stresses the need to protect non-forest ecosystems.`
    }
  ],
  examPerspective: {
    points: [
      "Grassland ecosystems",
      "Species discovery in India",
      "Conservation of lesser-known habitats"
    ]
  },
  keyTakeaways: [
    "New spider species discovered",
    "Highlights grassland biodiversity",
    "Supports ecosystem conservation"
  ],
  sources: ["Zoological Survey of India"]
},

"Sharda River Corridor Project Launched in Champawat": {
  introduction: `The Sharda River Corridor Project has been launched in Champawat, Uttarakhand, aiming to boost tourism, ecology, and regional development.`,
  keyHighlights: [
    { label: "River", value: "Sharda River" },
    { label: "Location", value: "Champawat, Uttarakhand" },
    { label: "Sector", value: "Infrastructure & Tourism" }
  ],
  sections: [
    {
      heading: "About the Project",
      content: `The project focuses on riverfront development, eco-tourism, and cultural promotion.`
    },
    {
      heading: "Economic Benefits",
      content: `It is expected to generate employment and enhance local livelihoods.`
    },
    {
      heading: "Environmental Considerations",
      content: `Sustainable development principles are emphasized.`
    }
  ],
  examPerspective: {
    points: [
      "Riverfront development",
      "Sustainable tourism",
      "Regional development initiatives"
    ]
  },
  keyTakeaways: [
    "Sharda River Corridor launched",
    "Boosts tourism and economy",
    "Focus on sustainable infrastructure"
  ],
  sources: ["State Government Releases"]
},


"Centre Plans Comprehensive Development of Kondaveedu Fort": {
  introduction: `The Union Government has announced a comprehensive development plan for Kondaveedu Fort in Andhra Pradesh to promote heritage conservation and cultural tourism.`,
  keyHighlights: [
    { label: "Site", value: "Kondaveedu Fort" },
    { label: "Location", value: "Guntur district, Andhra Pradesh" },
    { label: "Sector", value: "Culture & Heritage" },
    { label: "Objective", value: "Tourism-led development" }
  ],
  sections: [
    {
      heading: "Historical Background",
      content: `Kondaveedu Fort was a major stronghold of the Reddy dynasty and later came under Vijayanagara and Qutb Shahi rule.`
    },
    {
      heading: "Development Plan",
      content: `The project includes restoration of fort structures, visitor amenities, interpretation centres, and improved connectivity.`
    },
    {
      heading: "Tourism and Local Economy",
      content: `Heritage tourism is expected to generate employment and boost local livelihoods.`
    }
  ],
  examPerspective: {
    points: [
      "Heritage conservation in India",
      "Tourism-led regional development",
      "Role of ASI and central government"
    ]
  },
  practiceQuestions: [
    {
      type: "Mains",
      question: "Discuss the role of heritage site development in promoting sustainable tourism in India."
    }
  ],
  keyTakeaways: [
    "Kondaveedu Fort to be comprehensively developed",
    "Boost to heritage tourism",
    "Preservation of cultural legacy"
  ],
  sources: ["Ministry of Culture"]
},

"India Explores New Kailash Yatra Route via Shipki La Pass": {
  introduction: `India is exploring a new Kailash Mansarovar Yatra route via Shipki La Pass in Himachal Pradesh to improve accessibility and strategic connectivity.`,
  keyHighlights: [
    { label: "Pass", value: "Shipki La Pass" },
    { label: "State", value: "Himachal Pradesh" },
    { label: "Purpose", value: "Pilgrimage & strategic access" }
  ],
  sections: [
    {
      heading: "About Shipki La Pass",
      content: `Shipki La is a high-altitude mountain pass near the India–China border in Himachal Pradesh.`
    },
    {
      heading: "Significance of the Route",
      content: `The route may reduce travel time and diversify access options for pilgrims.`
    },
    {
      heading: "Strategic Importance",
      content: `Improved infrastructure near border areas strengthens regional connectivity and security.`
    }
  ],
  examPerspective: {
    points: [
      "Border infrastructure development",
      "Religious tourism",
      "India–China border geography"
    ]
  },
  keyTakeaways: [
    "New Kailash Yatra route explored",
    "Enhances pilgrimage access",
    "Strategic border significance"
  ],
  sources: ["Ministry of External Affairs"]
},

"New Ant Species Discovered in Guwahati's Garbhanga Forest": {
  introduction: `Scientists have discovered a new species of ant in the Garbhanga Reserve Forest near Guwahati, adding to India’s insect biodiversity.`,
  keyHighlights: [
    { label: "Location", value: "Garbhanga Forest, Assam" },
    { label: "Species", value: "New ant species" },
    { label: "Habitat", value: "Tropical forest ecosystem" }
  ],
  sections: [
    {
      heading: "About Garbhanga Forest",
      content: `Garbhanga Reserve Forest is an ecologically rich area near Guwahati, supporting diverse flora and fauna.`
    },
    {
      heading: "Scientific Importance",
      content: `Ant species play a crucial role in soil aeration, seed dispersal, and ecosystem balance.`
    },
    {
      heading: "Conservation Relevance",
      content: `The discovery highlights the importance of protecting urban-adjacent forests.`
    }
  ],
  examPerspective: {
    points: [
      "Insect biodiversity",
      "Urban forest conservation",
      "North-East India ecology"
    ]
  },
  keyTakeaways: [
    "New ant species discovered in Assam",
    "Highlights ecological value of Garbhanga Forest",
    "Supports biodiversity conservation"
  ],
  sources: ["Zoological Survey of India"]
},


"Eurasian Otter Returns to Kashmir via LoC Waterways": {
  introduction: `The Eurasian otter has been sighted again in Kashmir, indicating improving freshwater ecosystem health and cross-border ecological connectivity.`,
  keyHighlights: [
    { label: "Species", value: "Eurasian Otter" },
    { label: "Region", value: "Kashmir Valley" },
    { label: "Indicator", value: "Freshwater ecosystem health" }
  ],
  sections: [
    {
      heading: "About Eurasian Otter",
      content: `The Eurasian otter is a semi-aquatic mammal sensitive to water quality and habitat disturbance.`
    },
    {
      heading: "Ecological Significance",
      content: `Its presence indicates clean rivers and healthy aquatic ecosystems.`
    },
    {
      heading: "Conservation Implications",
      content: `Highlights the need for transboundary conservation cooperation.`
    }
  ],
  examPerspective: {
    points: [
      "Indicator species",
      "Freshwater biodiversity",
      "Conservation in Himalayan region"
    ]
  },
  keyTakeaways: [
    "Otter sighting signals ecosystem recovery",
    "Positive sign for freshwater health",
    "Supports conservation efforts"
  ],
  sources: ["Wildlife Department Reports"]
},

"International Epilepsy Day 2026 Observed Globally": {
  introduction: `International Epilepsy Day 2026 was observed worldwide to raise awareness about epilepsy, reduce stigma, and promote access to healthcare.`,
  keyHighlights: [
    { label: "Event", value: "International Epilepsy Day" },
    { label: "Focus", value: "Awareness & inclusion" },
    { label: "Sector", value: "Public Health" }
  ],
  sections: [
    {
      heading: "About Epilepsy",
      content: `Epilepsy is a chronic neurological disorder characterized by recurrent seizures.`
    },
    {
      heading: "Purpose of the Day",
      content: `The day aims to educate society and encourage early diagnosis and treatment.`
    },
    {
      heading: "India’s Health Perspective",
      content: `Public awareness helps reduce social stigma and improves treatment outcomes.`
    }
  ],
  examPerspective: {
    points: [
      "Public health awareness campaigns",
      "Non-communicable diseases",
      "Healthcare accessibility"
    ]
  },
  keyTakeaways: [
    "Epilepsy Day observed globally",
    "Focus on awareness and stigma reduction",
    "Supports inclusive healthcare"
  ],
  sources: ["WHO", "Health Ministry"]
},

"India Clinch SAFF U-19 Women's Championship Title": {
  introduction: `India won the SAFF U-19 Women’s Championship, showcasing the country’s growing strength and depth in women’s football.`,
  keyHighlights: [
    { label: "Tournament", value: "SAFF U-19 Women’s Championship" },
    { label: "Winner", value: "India" },
    { label: "Category", value: "Sports – Football" }
  ],
  sections: [
    {
      heading: "About the SAFF Championship",
      content: `The SAFF U-19 Championship is a regional football tournament involving South Asian nations.`
    },
    {
      heading: "India’s Performance",
      content: `India displayed tactical discipline, fitness, and teamwork throughout the tournament.`
    },
    {
      heading: "Significance for Women’s Sports",
      content: `The victory reflects successful grassroots development and investment in women’s football.`
    }
  ],
  examPerspective: {
    points: [
      "Sports diplomacy in South Asia",
      "Women empowerment through sports",
      "Grassroots sports development"
    ]
  },
  keyTakeaways: [
    "India wins SAFF U-19 Women’s title",
    "Boost to women’s football",
    "Encourages youth participation"
  ],
  sources: ["SAFF", "Sports Authority of India"]
},


"Chess Added to Esports Nations Cup 2026 Line-up": {
  introduction: `Chess has been officially included in the Esports Nations Cup 2026, marking the convergence of traditional mind sports with digital esports platforms.`,
  keyHighlights: [
    { label: "Event", value: "Esports Nations Cup 2026" },
    { label: "New Addition", value: "Chess" },
    { label: "Category", value: "Sports & Esports" }
  ],
  sections: [
    {
      heading: "Why Chess in Esports?",
      content: `Online platforms have transformed chess into a globally competitive digital sport.`
    },
    {
      heading: "Impact on Esports Ecosystem",
      content: `The inclusion broadens esports appeal beyond action-based games.`
    },
    {
      heading: "India’s Advantage",
      content: `India’s strong chess culture provides a competitive edge.`
    }
  ],
  examPerspective: {
    points: [
      "Evolution of esports",
      "Digital transformation of sports",
      "India’s strength in chess"
    ]
  },
  keyTakeaways: [
    "Chess joins Esports Nations Cup",
    "Blends traditional and digital sports",
    "Expands esports diversity"
  ],
  sources: ["International Esports Federation"]
},

"Wool Production in India: States, Types and Industry Profile": {
  introduction: `Wool production in India plays an important role in the rural economy, particularly in arid and semi-arid regions.`,
  keyHighlights: [
    { label: "Leading States", value: "Rajasthan, Jammu & Kashmir, Gujarat" },
    { label: "Sector", value: "Agriculture & Allied Activities" },
    { label: "Industry", value: "Textiles" }
  ],
  sections: [
    {
      heading: "Major Wool-Producing Regions",
      content: `Rajasthan accounts for the largest share, followed by J&K and Gujarat.`
    },
    {
      heading: "Types of Wool",
      content: `India produces carpet wool, coarse wool, and specialty wool.`
    },
    {
      heading: "Industry Challenges",
      content: `Low productivity and competition from synthetic fibres affect the sector.`
    }
  ],
  examPerspective: {
    points: [
      "Animal husbandry in India",
      "Textile industry raw materials",
      "Rural livelihoods"
    ]
  },
  keyTakeaways: [
    "Wool supports rural economy",
    "Rajasthan is the leading producer",
    "Scope for modernization"
  ],
  sources: ["Department of Animal Husbandry"]
},

"Himachal CM Launches 'Padhai with AI' Initiative": {
  introduction: `The Himachal Pradesh Chief Minister launched the ‘Padhai with AI’ initiative to integrate artificial intelligence into school education.`,
  keyHighlights: [
    { label: "State", value: "Himachal Pradesh" },
    { label: "Initiative", value: "Padhai with AI" },
    { label: "Sector", value: "Education & Technology" }
  ],
  sections: [
    {
      heading: "Objective of the Initiative",
      content: `To personalize learning and improve student outcomes using AI tools.`
    },
    {
      heading: "Role of AI in Education",
      content: `AI enables adaptive learning, instant feedback, and teacher support.`
    },
    {
      heading: "Digital Education Push",
      content: `Supports India’s broader digital education goals.`
    }
  ],
  examPerspective: {
    points: [
      "AI in governance",
      "Digital education initiatives",
      "State-level innovation"
    ]
  },
  keyTakeaways: [
    "AI integrated into school education",
    "Enhances learning outcomes",
    "Supports Digital India vision"
  ],
  sources: ["State Government Releases"]
},

"Azista Space Achieves India's First In-Orbit Snooping Capability": {
  introduction: `Azista Space has achieved India’s first in-orbit snooping capability, marking a major advancement in space situational awareness.`,
  keyHighlights: [
    { label: "Company", value: "Azista Space" },
    { label: "Achievement", value: "In-orbit snooping" },
    { label: "Sector", value: "Space Technology" }
  ],
  sections: [
    {
      heading: "What is In-Orbit Snooping?",
      content: `It involves monitoring and observing objects in space for security and operational purposes.`
    },
    {
      heading: "Strategic Importance",
      content: `Enhances satellite protection and space domain awareness.`
    },
    {
      heading: "Private Sector Role",
      content: `Reflects growing participation of Indian private companies in space.`
    }
  ],
  examPerspective: {
    points: [
      "Space situational awareness",
      "Private sector in space",
      "Strategic technologies"
    ]
  },
  keyTakeaways: [
    "India gains in-orbit monitoring capability",
    "Boost to space security",
    "Private space sector growth"
  ],
  sources: ["Space Industry Reports"]
},

"Meghana Sajjanar Wins Asian Shooting Championships Bronze": {
  introduction: `Indian shooter Meghana Sajjanar secured a bronze medal at the Asian Shooting Championships, reinforcing India’s strong presence in international shooting sports.`,
  keyHighlights: [
    { label: "Athlete", value: "Meghana Sajjanar" },
    { label: "Event", value: "Asian Shooting Championships" },
    { label: "Medal", value: "Bronze" }
  ],
  sections: [
    {
      heading: "About the Championship",
      content: `The Asian Shooting Championships is a premier continental competition featuring top shooters from across Asia.`
    },
    {
      heading: "Performance Highlights",
      content: `Meghana demonstrated consistency and composure under pressure to secure a podium finish.`
    },
    {
      heading: "Significance for India",
      content: `The medal adds to India’s growing medal tally and strengthens Olympic preparations.`
    }
  ],
  examPerspective: {
    points: [
      "India’s performance in shooting sports",
      "Role of shooting academies",
      "Sports infrastructure development"
    ]
  },
  keyTakeaways: [
    "India wins bronze at Asian level",
    "Boost to women shooters",
    "Strengthens Olympic prospects"
  ],
  sources: ["National Rifle Association of India"]
},

"India–US Trade Pact Cuts Duties on Wines and Dry Fruits": {
  introduction: `India and the United States have agreed to reduce import duties on wines and dry fruits, signaling progress in bilateral trade relations.`,
  keyHighlights: [
    { label: "Countries", value: "India and United States" },
    { label: "Products", value: "Wines and Dry Fruits" },
    { label: "Sector", value: "International Trade" }
  ],
  sections: [
    {
      heading: "Background of the Pact",
      content: `The agreement is part of broader efforts to ease trade frictions and expand market access.`
    },
    {
      heading: "Economic Implications",
      content: `Lower duties may reduce prices for consumers and increase trade volumes.`
    },
    {
      heading: "Strategic Significance",
      content: `Strengthens India–US economic partnership amid global trade realignments.`
    }
  ],
  examPerspective: {
    points: [
      "Bilateral trade agreements",
      "Tariff and non-tariff barriers",
      "India–US economic relations"
    ]
  },
  keyTakeaways: [
    "Duties reduced on select goods",
    "Boosts bilateral trade",
    "Positive signal for investors"
  ],
  sources: ["Ministry of Commerce"]
},

"RSS Flag March from Kashmir to Kanyakumari": {
  introduction: `The Rashtriya Swayamsevak Sangh (RSS) organized a nationwide flag march from Kashmir to Kanyakumari, emphasizing national unity and social outreach.`,
  keyHighlights: [
    { label: "Organization", value: "RSS" },
    { label: "Route", value: "Kashmir to Kanyakumari" },
    { label: "Theme", value: "National integration" }
  ],
  sections: [
    {
      heading: "Purpose of the March",
      content: `The march aimed to promote unity, discipline, and social harmony across regions.`
    },
    {
      heading: "Scale and Reach",
      content: `It passed through multiple states involving volunteers and public interaction.`
    },
    {
      heading: "Political and Social Context",
      content: `Such events often attract attention regarding civil society engagement in nation-building.`
    }
  ],
  examPerspective: {
    points: [
      "Role of civil society organizations",
      "National integration initiatives",
      "Freedom of assembly"
    ]
  },
  keyTakeaways: [
    "Nationwide flag march conducted",
    "Focus on unity and outreach",
    "Highlights civil society participation"
  ],
  sources: ["Press Reports"]
},

"Cancer Cells Reprogramme Immune Cells to Aid Tumour Growth": {
  introduction: `New research has revealed that cancer cells can reprogramme immune cells to support tumour growth, offering insights for targeted cancer therapies.`,
  keyHighlights: [
    { label: "Field", value: "Medical Research" },
    { label: "Focus", value: "Cancer–immune interaction" },
    { label: "Significance", value: "Therapeutic innovation" }
  ],
  sections: [
    {
      heading: "Key Research Findings",
      content: `Tumour cells manipulate immune responses, converting protective cells into tumour-supporting agents.`
    },
    {
      heading: "Why This Matters",
      content: `Understanding this mechanism helps design more effective immunotherapies.`
    },
    {
      heading: "Future Applications",
      content: `Can lead to precision medicine approaches in oncology.`
    }
  ],
  examPerspective: {
    points: [
      "Advances in cancer research",
      "Immunotherapy",
      "Biotechnology applications"
    ]
  },
  keyTakeaways: [
    "Cancer manipulates immune system",
    "Opens new therapy pathways",
    "Boosts biomedical research"
  ],
  sources: ["Scientific Journals"]
},

"South Africa Launches First Local FMD Vaccine in 20 Years": {
  introduction: `South Africa has launched its first locally developed Foot-and-Mouth Disease (FMD) vaccine in two decades, strengthening livestock disease control.`,
  keyHighlights: [
    { label: "Country", value: "South Africa" },
    { label: "Disease", value: "Foot-and-Mouth Disease" },
    { label: "Sector", value: "Veterinary Science" }
  ],
  sections: [
    {
      heading: "About FMD",
      content: `FMD is a highly contagious viral disease affecting cloven-hoofed animals.`
    },
    {
      heading: "Significance of Local Vaccine",
      content: `Reduces dependence on imports and ensures timely disease response.`
    },
    {
      heading: "Global Relevance",
      content: `Livestock health is crucial for food security and trade.`
    }
  ],
  examPerspective: {
    points: [
      "Animal health management",
      "Food security",
      "Vaccine development"
    ]
  },
  keyTakeaways: [
    "Local FMD vaccine launched",
    "Boost to livestock sector",
    "Enhances biosecurity"
  ],
  sources: ["Agriculture Ministry Reports"]
},

"Anutin Charnvirakul Wins Thailand Snap Election": {
  introduction: `Anutin Charnvirakul has won Thailand’s snap election, marking a significant political shift and reshaping the country’s governance landscape.`,
  keyHighlights: [
    { label: "Country", value: "Thailand" },
    { label: "Leader", value: "Anutin Charnvirakul" },
    { label: "Event", value: "Snap Election" },
    { label: "Category", value: "International Politics" }
  ],
  sections: [
    {
      heading: "Background of the Snap Election",
      content: `The snap election was called amid political instability and governance challenges in Thailand.`
    },
    {
      heading: "Who is Anutin Charnvirakul?",
      content: `Anutin is a senior Thai politician known for his pragmatic leadership and administrative experience.`
    },
    {
      heading: "Implications for Thailand",
      content: `The election result is expected to influence domestic reforms and Thailand’s regional diplomacy.`
    }
  ],
  examPerspective: {
    points: [
      "Political developments in Southeast Asia",
      "Snap elections and democratic processes",
      "India–Thailand relations"
    ]
  },
  keyTakeaways: [
    "Anutin wins Thailand snap election",
    "Political stability likely to improve",
    "Regional implications in ASEAN"
  ],
  sources: ["International News Agencies"]
},

"Sanae Takaichi Secures Supermajority in Japan Election": {
  introduction: `Sanae Takaichi secured a supermajority in Japan’s parliamentary elections, consolidating political power and policy continuity.`,
  keyHighlights: [
    { label: "Country", value: "Japan" },
    { label: "Leader", value: "Sanae Takaichi" },
    { label: "Outcome", value: "Supermajority Victory" }
  ],
  sections: [
    {
      heading: "Election Outcome",
      content: `A supermajority allows the ruling leadership to pass legislation with minimal opposition.`
    },
    {
      heading: "Policy Direction",
      content: `The result supports economic reforms, defence strengthening, and constitutional debates.`
    },
    {
      heading: "Global Significance",
      content: `Japan’s political stability is crucial for Indo-Pacific security dynamics.`
    }
  ],
  examPerspective: {
    points: [
      "Japanese political system",
      "Indo-Pacific geopolitics",
      "Role of supermajorities"
    ]
  },
  keyTakeaways: [
    "Supermajority achieved in Japan",
    "Policy continuity ensured",
    "Strategic regional impact"
  ],
  sources: ["Japanese Government Statements"]
},

"Arjun Ram Meghwal Launches The Medicolegal Guidebook": {
  introduction: `Union Minister Arjun Ram Meghwal launched a medicolegal guidebook to strengthen coordination between medical and legal professionals.`,
  keyHighlights: [
    { label: "Minister", value: "Arjun Ram Meghwal" },
    { label: "Initiative", value: "Medicolegal Guidebook" },
    { label: "Sector", value: "Health & Justice" }
  ],
  sections: [
    {
      heading: "Need for Medicolegal Guidance",
      content: `Medical professionals often face legal complexities in clinical and forensic cases.`
    },
    {
      heading: "Key Features of the Guidebook",
      content: `It standardizes procedures, documentation, and legal compliance.`
    },
    {
      heading: "Expected Impact",
      content: `Improves justice delivery and reduces procedural errors.`
    }
  ],
  examPerspective: {
    points: [
      "Judicial reforms",
      "Healthcare governance",
      "Legal–medical interface"
    ]
  },
  keyTakeaways: [
    "Medicolegal guidebook launched",
    "Supports doctors and legal officers",
    "Improves justice delivery"
  ],
  sources: ["Ministry of Law and Justice"]
},

"Queensland Moves to Ban Pro-Palestinian Slogans": {
  introduction: `Queensland has proposed restrictions on pro-Palestinian slogans, sparking debate over free speech and public order.`,
  keyHighlights: [
    { label: "Region", value: "Queensland, Australia" },
    { label: "Issue", value: "Public slogans and protests" },
    { label: "Theme", value: "Freedom of Expression" }
  ],
  sections: [
    {
      heading: "Reason Behind the Move",
      content: `Authorities cite concerns over public safety and social harmony.`
    },
    {
      heading: "Free Speech Debate",
      content: `Critics argue such bans may infringe democratic freedoms.`
    },
    {
      heading: "International Context",
      content: `The issue reflects global polarization over West Asia conflicts.`
    }
  ],
  examPerspective: {
    points: [
      "Freedom of speech",
      "Civil liberties vs public order",
      "Global protest politics"
    ]
  },
  keyTakeaways: [
    "Queensland considers slogan ban",
    "Debate on civil liberties",
    "Global political sensitivity"
  ],
  sources: ["Australian Media Reports"]
},

"Cardinal Poola Anthony Elected CBCI President": {
  introduction: `Cardinal Poola Anthony has been elected President of the Catholic Bishops’ Conference of India (CBCI), marking a significant leadership milestone.`,
  keyHighlights: [
    { label: "Leader", value: "Cardinal Poola Anthony" },
    { label: "Organization", value: "CBCI" },
    { label: "Category", value: "Culture & Society" }
  ],
  sections: [
    {
      heading: "About CBCI",
      content: `CBCI is the apex representative body of Catholic bishops in India.`
    },
    {
      heading: "Significance of the Election",
      content: `The election reflects inclusivity and evolving leadership within the Church.`
    },
    {
      heading: "Social Role",
      content: `CBCI plays an active role in education, healthcare, and social service.`
    }
  ],
  examPerspective: {
    points: [
      "Religious institutions in India",
      "Social service organizations",
      "Cultural diversity"
    ]
  },
  keyTakeaways: [
    "New CBCI President elected",
    "Leadership milestone",
    "Continued social engagement"
  ],
  sources: ["CBCI Official Releases"]
},

"India Ranks Second Globally in LEED-Certified Green Realty": {
  introduction: `India has emerged as the world’s second-largest country in terms of LEED-certified green real estate, highlighting rapid adoption of sustainable construction practices.`,
  keyHighlights: [
    { label: "Ranking", value: "2nd globally" },
    { label: "Certification", value: "LEED" },
    { label: "Sector", value: "Green Buildings" }
  ],
  sections: [
    {
      heading: "What is LEED?",
      content: `Leadership in Energy and Environmental Design (LEED) is a global green building certification system promoting sustainability.`
    },
    {
      heading: "India’s Performance",
      content: `India’s ranking reflects large-scale adoption by commercial, residential, and institutional projects.`
    },
    {
      heading: "Environmental Significance",
      content: `Green buildings reduce carbon emissions, energy consumption, and water use.`
    }
  ],
  examPerspective: {
    points: [
      "Sustainable urban development",
      "Climate change mitigation",
      "Green construction policies"
    ]
  },
  keyTakeaways: [
    "India ranks second in LEED buildings",
    "Strong push toward sustainability",
    "Supports climate commitments"
  ],
  sources: ["USGBC", "Government Reports"]
},

"PM Modi Begins Two-Day Official Visit to Malaysia": {
  introduction: `Prime Minister Narendra Modi began a two-day official visit to Malaysia aimed at strengthening bilateral ties and regional cooperation.`,
  keyHighlights: [
    { label: "Countries", value: "India–Malaysia" },
    { label: "Visit Type", value: "Official" },
    { label: "Focus", value: "Diplomacy & Trade" }
  ],
  sections: [
    {
      heading: "Agenda of the Visit",
      content: `Discussions include trade, investment, technology, and regional security.`
    },
    {
      heading: "Strategic Importance",
      content: `Malaysia is a key partner in India’s Act East Policy.`
    },
    {
      heading: "Regional Context",
      content: `Cooperation supports stability in the Indo-Pacific region.`
    }
  ],
  examPerspective: {
    points: [
      "India’s Act East Policy",
      "Bilateral diplomacy",
      "Indo-Pacific strategy"
    ]
  },
  keyTakeaways: [
    "High-level diplomatic engagement",
    "Boosts trade and cooperation",
    "Strengthens Act East Policy"
  ],
  sources: ["MEA Statements"]
},

"India's Forex Reserves Hit Record High": {
  introduction: `India’s foreign exchange reserves have reached a record high, strengthening macroeconomic stability and external sector resilience.`,
  keyHighlights: [
    { label: "Indicator", value: "Forex Reserves" },
    { label: "Status", value: "Record High" },
    { label: "Sector", value: "Economy" }
  ],
  sections: [
    {
      heading: "What Are Forex Reserves?",
      content: `They include foreign currencies, gold, SDRs, and IMF reserve position.`
    },
    {
      heading: "Why the Increase Matters",
      content: `Higher reserves provide a buffer against external shocks.`
    },
    {
      heading: "Policy Implications",
      content: `Supports currency stability and investor confidence.`
    }
  ],
  examPerspective: {
    points: [
      "Balance of payments",
      "External sector stability",
      "RBI’s role"
    ]
  },
  keyTakeaways: [
    "Forex reserves at record level",
    "Improves economic resilience",
    "Boosts investor confidence"
  ],
  sources: ["RBI Data"]
},

"US Removes Additional 25% Tariffs on Indian Goods": {
  introduction: `The United States has removed the additional 25% tariffs imposed on select Indian goods, easing trade tensions and improving bilateral economic relations.`,
  keyHighlights: [
    { label: "Countries", value: "India–United States" },
    { label: "Measure", value: "Removal of additional tariffs" },
    { label: "Sector", value: "International Trade" }
  ],
  sections: [
    {
      heading: "Background of the Tariffs",
      content: `The tariffs were imposed during earlier trade disputes over market access and trade imbalances.`
    },
    {
      heading: "Impact on Indian Exports",
      content: `Removal of tariffs enhances competitiveness of Indian goods in the US market.`
    },
    {
      heading: "Strategic Significance",
      content: `Signals improved trade relations and cooperation between the two economies.`
    }
  ],
  examPerspective: {
    points: [
      "Tariff and trade policy",
      "India–US economic relations",
      "Global trade realignments"
    ]
  },
  keyTakeaways: [
    "US lifts additional tariffs",
    "Boosts Indian exports",
    "Improves bilateral trade climate"
  ],
  sources: ["US Trade Representative Releases"]
},

"VOC Port Becomes First in India to Deploy Anti-Drone System": {
  introduction: `V.O. Chidambaranar (VOC) Port has become the first port in India to deploy an anti-drone system, enhancing critical infrastructure security.`,
  keyHighlights: [
    { label: "Port", value: "VOC Port, Tamil Nadu" },
    { label: "Technology", value: "Anti-drone system" },
    { label: "Sector", value: "Port Security" }
  ],
  sections: [
    {
      heading: "Need for Anti-Drone Systems",
      content: `Drones pose emerging threats to ports, airports, and other strategic assets.`
    },
    {
      heading: "Security Enhancement",
      content: `The system enables detection, tracking, and neutralization of rogue drones.`
    },
    {
      heading: "National Significance",
      content: `Sets a benchmark for securing critical infrastructure across India.`
    }
  ],
  examPerspective: {
    points: [
      "Critical infrastructure protection",
      "Emerging security threats",
      "Use of technology in security"
    ]
  },
  keyTakeaways: [
    "First Indian port with anti-drone system",
    "Strengthens maritime security",
    "Model for other ports"
  ],
  sources: ["Port Authority Statements"]
},

"RCB Clinches Second Women's Premier League Title": {
  introduction: `Royal Challengers Bangalore (RCB) clinched their second Women’s Premier League title, highlighting the rapid growth of women’s cricket in India.`,
  keyHighlights: [
    { label: "Team", value: "Royal Challengers Bangalore" },
    { label: "Tournament", value: "Women’s Premier League" },
    { label: "Achievement", value: "Second title" }
  ],
  sections: [
    {
      heading: "About the WPL",
      content: `The Women’s Premier League is a professional T20 cricket league that promotes women’s cricket in India.`
    },
    {
      heading: "RCB’s Performance",
      content: `Consistent performances and strong team balance led to their victory.`
    },
    {
      heading: "Impact on Women’s Sports",
      content: `The league boosts visibility, investment, and participation in women’s cricket.`
    }
  ],
  examPerspective: {
    points: [
      "Women empowerment through sports",
      "Sports leagues in India",
      "Grassroots sports development"
    ]
  },
  keyTakeaways: [
    "RCB wins second WPL title",
    "Boost to women’s cricket",
    "Encourages youth participation"
  ],
  sources: ["BCCI", "Sports News"]
},

"Surajkund International Crafts Mela Highlights Artisan Self-Reliance": {
  introduction: `The Surajkund International Crafts Mela showcased India’s rich handicraft traditions while promoting artisan self-reliance and livelihood generation.`,
  keyHighlights: [
    { label: "Event", value: "Surajkund Crafts Mela" },
    { label: "Location", value: "Haryana" },
    { label: "Theme", value: "Artisan self-reliance" }
  ],
  sections: [
    {
      heading: "About the Mela",
      content: `It is an annual cultural event featuring crafts, handlooms, and folk arts from India and abroad.`
    },
    {
      heading: "Economic Significance",
      content: `Provides direct market access to artisans and craftsmen.`
    },
    {
      heading: "Cultural Importance",
      content: `Preserves traditional art forms and promotes cultural exchange.`
    }
  ],
  examPerspective: {
    points: [
      "Cultural heritage preservation",
      "Handicraft sector",
      "Vocal for Local initiative"
    ]
  },
  keyTakeaways: [
    "Supports artisan livelihoods",
    "Promotes cultural heritage",
    "Encourages self-reliance"
  ],
  sources: ["Ministry of Culture"]
},

"Delhi Police Launches Operation Shastra": {
  introduction: `Delhi Police launched Operation Shastra to strengthen crime prevention, surveillance, and public safety across the national capital.`,
  keyHighlights: [
    { label: "Agency", value: "Delhi Police" },
    { label: "Operation", value: "Operation Shastra" },
    { label: "Objective", value: "Crime prevention" }
  ],
  sections: [
    {
      heading: "Purpose of Operation Shastra",
      content: `The operation focuses on intensified patrolling, intelligence gathering, and rapid response.`
    },
    {
      heading: "Public Safety Measures",
      content: `Enhanced coordination and use of technology are key components.`
    },
    {
      heading: "Governance Perspective",
      content: `Such initiatives improve urban safety and law enforcement efficiency.`
    }
  ],
  examPerspective: {
    points: [
      "Internal security",
      "Urban policing",
      "Use of technology in law enforcement"
    ]
  },
  keyTakeaways: [
    "Operation Shastra launched",
    "Strengthens urban security",
    "Focus on proactive policing"
  ],
  sources: ["Delhi Police Releases"]
},

"India Wins Record Sixth ICC U-19 Cricket World Cup": {
  introduction: `India clinched a record sixth ICC Under-19 Cricket World Cup title, reaffirming its dominance in youth cricket and talent development.`,
  keyHighlights: [
    { label: "Tournament", value: "ICC U-19 Cricket World Cup" },
    { label: "Winner", value: "India" },
    { label: "Record", value: "Sixth title" }
  ],
  sections: [
    {
      heading: "Tournament Overview",
      content: `The U-19 World Cup serves as a global platform for identifying future international cricketers.`
    },
    {
      heading: "India’s Winning Formula",
      content: `Strong bench strength, coaching systems, and domestic pathways contributed to success.`
    },
    {
      heading: "Long-Term Impact",
      content: `Youth success strengthens the senior team pipeline.`
    }
  ],
  examPerspective: {
    points: [
      "Sports talent development",
      "Role of academies",
      "Youth sports policy"
    ]
  },
  keyTakeaways: [
    "India wins sixth U-19 World Cup",
    "Confirms youth cricket strength",
    "Boosts future talent pool"
  ],
  sources: ["ICC", "BCCI"]
},

"NASA's SPHEREx Detects Organic Molecules in Interstellar Comet": {
  introduction: `NASA’s SPHEREx mission has detected organic molecules in an interstellar comet, advancing understanding of the origins of life.`,
  keyHighlights: [
    { label: "Mission", value: "SPHEREx" },
    { label: "Discovery", value: "Organic molecules" },
    { label: "Field", value: "Astrobiology" }
  ],
  sections: [
    {
      heading: "About SPHEREx",
      content: `SPHEREx is a space telescope designed to map the universe and study cosmic origins.`
    },
    {
      heading: "Scientific Significance",
      content: `Organic molecules are building blocks of life, offering clues to prebiotic chemistry.`
    },
    {
      heading: "Broader Implications",
      content: `Supports theories about life-forming materials traveling through space.`
    }
  ],
  examPerspective: {
    points: [
      "Space missions",
      "Astrobiology",
      "Origin of life studies"
    ]
  },
  keyTakeaways: [
    "Organic molecules detected",
    "Boosts astrobiology research",
    "Enhances cosmic understanding"
  ],
  sources: ["NASA Releases"]
},

"RBI Keeps Repo Rate Unchanged at 5.25%": {
  introduction: `The Reserve Bank of India has kept the repo rate unchanged at 5.25%, prioritizing inflation control and growth stability.`,
  keyHighlights: [
    { label: "Authority", value: "RBI" },
    { label: "Repo Rate", value: "5.25%" },
    { label: "Policy", value: "Monetary policy" }
  ],
  sections: [
    {
      heading: "What is Repo Rate?",
      content: `It is the rate at which RBI lends short-term funds to commercial banks.`
    },
    {
      heading: "Reason for Status Quo",
      content: `Balancing inflation risks with economic growth considerations.`
    },
    {
      heading: "Economic Impact",
      content: `Supports financial stability and predictable borrowing costs.`
    }
  ],
  examPerspective: {
    points: [
      "Monetary policy tools",
      "Inflation management",
      "RBI’s role"
    ]
  },
  keyTakeaways: [
    "Repo rate unchanged",
    "Focus on stability",
    "Supports growth outlook"
  ],
  sources: ["RBI Monetary Policy Statement"]
},

"Global Push to End Female Genital Mutilation": {
  introduction: `International organizations and governments are intensifying efforts to end Female Genital Mutilation (FGM) worldwide.`,
  keyHighlights: [
    { label: "Issue", value: "Female Genital Mutilation" },
    { label: "Focus", value: "Human rights" },
    { label: "Scope", value: "Global" }
  ],
  sections: [
    {
      heading: "What is FGM?",
      content: `FGM involves procedures that intentionally alter or injure female genital organs for non-medical reasons.`
    },
    {
      heading: "Why It Persists",
      content: `Deep-rooted social norms and lack of awareness sustain the practice.`
    },
    {
      heading: "Global Efforts",
      content: `UN agencies and governments promote legal bans, education, and community engagement.`
    }
  ],
  examPerspective: {
    points: [
      "Women’s rights",
      "International conventions",
      "Social reform initiatives"
    ]
  },
  keyTakeaways: [
    "FGM is a human rights violation",
    "Global action intensified",
    "Focus on awareness and law"
  ],
  sources: ["UNICEF", "WHO"]
},

"Alwar Achieves 100% Insurance Coverage": {
  introduction: `Alwar district has achieved 100% insurance coverage, marking a major milestone in social security and financial inclusion.`,
  keyHighlights: [
    { label: "District", value: "Alwar, Rajasthan" },
    { label: "Coverage", value: "100% Insurance" },
    { label: "Sector", value: "Social Welfare" }
  ],
  sections: [
    {
      heading: "Insurance Coverage Initiative",
      content: `The achievement covers health and social insurance schemes.`
    },
    {
      heading: "Governance Success",
      content: `Effective outreach and digital enrollment enabled full coverage.`
    },
    {
      heading: "Social Impact",
      content: `Improves resilience of vulnerable households.`
    }
  ],
  examPerspective: {
    points: [
      "Financial inclusion",
      "Social security schemes",
      "District-level governance"
    ]
  },
  keyTakeaways: [
    "100% insurance achieved",
    "Model for other districts",
    "Boosts social protection"
  ],
  sources: ["State Government Reports"]
},

"Iran Reaffirms Support for Chabahar Port Project": {
  introduction: `Iran has reaffirmed its commitment to the Chabahar Port project, underscoring its strategic importance for regional connectivity and India’s access to Central Asia.`,
  keyHighlights: [
    { label: "Project", value: "Chabahar Port" },
    { label: "Countries", value: "India–Iran" },
    { label: "Region", value: "West Asia & Central Asia" }
  ],
  sections: [
    {
      heading: "About Chabahar Port",
      content: `Located in southeastern Iran, Chabahar provides India a strategic alternative route to Afghanistan and Central Asia bypassing Pakistan.`
    },
    {
      heading: "Strategic Importance",
      content: `The port enhances India’s regional trade, energy security, and geopolitical outreach.`
    },
    {
      heading: "Regional Connectivity",
      content: `Chabahar links with the International North–South Transport Corridor (INSTC).`
    }
  ],
  examPerspective: {
    points: [
      "India–Iran relations",
      "Regional connectivity projects",
      "Strategic ports"
    ]
  },
  keyTakeaways: [
    "Iran reiterates support for Chabahar",
    "Boost to India’s regional access",
    "Enhances trade connectivity"
  ],
  sources: ["MEA Statements"]
},

"Government Rejects Lowering Age of Consent": {
  introduction: `The Government has rejected proposals to lower the age of consent, citing child protection, legal safeguards, and societal concerns.`,
  keyHighlights: [
    { label: "Issue", value: "Age of Consent" },
    { label: "Decision", value: "No change" },
    { label: "Law", value: "POCSO Act" }
  ],
  sections: [
    {
      heading: "Legal Framework",
      content: `The age of consent in India is currently 18 years under the POCSO Act.`
    },
    {
      heading: "Reason for Rejection",
      content: `Lowering the age could weaken child protection and legal safeguards.`
    },
    {
      heading: "Societal Perspective",
      content: `The decision balances personal liberty with protection of minors.`
    }
  ],
  examPerspective: {
    points: [
      "Child rights laws",
      "POCSO Act",
      "Balancing liberty and protection"
    ]
  },
  keyTakeaways: [
    "Age of consent unchanged",
    "Child protection prioritized",
    "Legal clarity maintained"
  ],
  sources: ["Ministry of Women and Child Development"]
},

"Goa Becomes Second State to Publish Bird Atlas": {
  introduction: `Goa has become the second Indian state to publish a comprehensive Bird Atlas, strengthening biodiversity documentation and conservation efforts.`,
  keyHighlights: [
    { label: "State", value: "Goa" },
    { label: "Achievement", value: "Bird Atlas publication" },
    { label: "Sector", value: "Environment" }
  ],
  sections: [
    {
      heading: "What is a Bird Atlas?",
      content: `A Bird Atlas documents bird species distribution over time and space.`
    },
    {
      heading: "Significance of the Atlas",
      content: `Provides scientific data for conservation planning and habitat protection.`
    },
    {
      heading: "Citizen Science Role",
      content: `The project involved birdwatchers and researchers collaboratively.`
    }
  ],
  examPerspective: {
    points: [
      "Biodiversity documentation",
      "Citizen science",
      "Wildlife conservation"
    ]
  },
  keyTakeaways: [
    "Goa publishes Bird Atlas",
    "Boosts conservation planning",
    "Encourages citizen participation"
  ],
  sources: ["State Forest Department"]
},

"Delhi Ranked Second Most Polluted City in January: CREA": {
  introduction: `Delhi was ranked the second most polluted city in January according to the Centre for Research on Energy and Clean Air (CREA).`,
  keyHighlights: [
    { label: "City", value: "Delhi" },
    { label: "Ranking", value: "Second most polluted" },
    { label: "Agency", value: "CREA" }
  ],
  sections: [
    {
      heading: "Findings of the Report",
      content: `High PM2.5 levels were recorded due to vehicular emissions, weather conditions, and stubble burning.`
    },
    {
      heading: "Health Implications",
      content: `Air pollution poses severe respiratory and cardiovascular risks.`
    },
    {
      heading: "Policy Response",
      content: `Calls for stricter emission norms and regional coordination.`
    }
  ],
  examPerspective: {
    points: [
      "Air pollution in India",
      "Urban environmental challenges",
      "Public health impact"
    ]
  },
  keyTakeaways: [
    "Delhi ranks among most polluted cities",
    "Air quality remains critical",
    "Policy action needed"
  ],
  sources: ["CREA Report"]
},

"Arun Icecreams Sets Guinness World Record in Hyderabad": {
  introduction: `Arun Icecreams set a Guinness World Record in Hyderabad, showcasing India’s growing consumer brand outreach and marketing innovation.`,
  keyHighlights: [
    { label: "Brand", value: "Arun Icecreams" },
    { label: "Record", value: "Guinness World Record" },
    { label: "Location", value: "Hyderabad" }
  ],
  sections: [
    {
      heading: "About the Record",
      content: `The record was achieved through a large-scale promotional and community engagement event.`
    },
    {
      heading: "Business Significance",
      content: `Highlights innovative brand-building and consumer engagement strategies.`
    },
    {
      heading: "Economic Angle",
      content: `Reflects growth of India’s FMCG sector.`
    }
  ],
  examPerspective: {
    points: [
      "Brand building in India",
      "FMCG sector growth",
      "Consumer economy"
    ]
  },
  keyTakeaways: [
    "Guinness record achieved",
    "Boosts brand visibility",
    "Reflects FMCG growth"
  ],
  sources: ["Guinness World Records"]
},

"Amaravati Quantum Valley Project Launched in Andhra Pradesh": {
  introduction: `Andhra Pradesh has launched the Amaravati Quantum Valley Project to position the state as a hub for quantum computing research and innovation.`,
  keyHighlights: [
    { label: "State", value: "Andhra Pradesh" },
    { label: "Project", value: "Amaravati Quantum Valley" },
    { label: "Sector", value: "Advanced Technology" }
  ],
  sections: [
    {
      heading: "What is Quantum Computing?",
      content: `Quantum computing uses quantum bits to perform complex calculations far faster than classical computers.`
    },
    {
      heading: "Objectives of the Project",
      content: `The project aims to foster research, startups, and industry collaboration.`
    },
    {
      heading: "National Significance",
      content: `Supports India’s ambitions in emerging technologies.`
    }
  ],
  examPerspective: {
    points: [
      "Quantum technologies",
      "State-led innovation",
      "Emerging tech ecosystems"
    ]
  },
  keyTakeaways: [
    "Quantum Valley launched",
    "Boosts advanced research",
    "Supports Digital India"
  ],
  sources: ["State Government Releases"]
},

"China Clears Limited Rare Earth Exports to Japan": {
  introduction: `China has approved limited exports of rare earth elements to Japan, highlighting strategic control over critical minerals.`,
  keyHighlights: [
    { label: "Countries", value: "China–Japan" },
    { label: "Commodity", value: "Rare Earth Elements" },
    { label: "Sector", value: "Strategic Minerals" }
  ],
  sections: [
    {
      heading: "What are Rare Earths?",
      content: `Rare earth elements are critical for electronics, defence, and renewable technologies.`
    },
    {
      heading: "Geopolitical Context",
      content: `China dominates global rare earth supply chains.`
    },
    {
      heading: "Global Implications",
      content: `Raises concerns over supply security for other nations.`
    }
  ],
  examPerspective: {
    points: [
      "Critical mineral supply chains",
      "Geopolitics of resources",
      "India’s mineral strategy"
    ]
  },
  keyTakeaways: [
    "China permits limited exports",
    "Highlights resource leverage",
    "Strategic supply concerns"
  ],
  sources: ["International Trade Reports"]
},

"India Successfully Test-Fires Agni-III Ballistic Missile": {
  introduction: `India successfully test-fired the Agni-III ballistic missile, reinforcing its strategic deterrence capabilities.`,
  keyHighlights: [
    { label: "Missile", value: "Agni-III" },
    { label: "Type", value: "Ballistic missile" },
    { label: "Sector", value: "Defence" }
  ],
  sections: [
    {
      heading: "About Agni-III",
      content: `Agni-III is an intermediate-range ballistic missile capable of carrying nuclear warheads.`
    },
    {
      heading: "Strategic Importance",
      content: `Enhances India’s credible minimum deterrence.`
    },
    {
      heading: "Regional Context",
      content: `Demonstrates technological readiness and strategic stability.`
    }
  ],
  examPerspective: {
    points: [
      "Missile technology",
      "Nuclear deterrence",
      "Defence preparedness"
    ]
  },
  keyTakeaways: [
    "Agni-III test successful",
    "Boosts strategic deterrence",
    "Strengthens defence capability"
  ],
  sources: ["DRDO Statements"]
},

"Tamil Nadu Launches Urban Greening Policy": {
  introduction: `Tamil Nadu has launched an Urban Greening Policy to enhance green cover and improve urban environmental quality.`,
  keyHighlights: [
    { label: "State", value: "Tamil Nadu" },
    { label: "Policy", value: "Urban Greening Policy" },
    { label: "Focus", value: "Urban environment" }
  ],
  sections: [
    {
      heading: "Policy Objectives",
      content: `Aims to increase tree cover, reduce heat islands, and improve air quality.`
    },
    {
      heading: "Implementation Measures",
      content: `Includes urban forestry, green corridors, and community participation.`
    },
    {
      heading: "Environmental Impact",
      content: `Supports climate resilience and public health.`
    }
  ],
  examPerspective: {
    points: [
      "Urban environmental management",
      "Climate resilience",
      "State-level green policies"
    ]
  },
  keyTakeaways: [
    "Urban greening policy launched",
    "Improves city livability",
    "Supports sustainability goals"
  ],
  sources: ["State Environment Department"]
},

"Iran's First Female Member Elected to IOC": {
  introduction: `Iran has elected its first female member to the International Olympic Committee, marking a milestone for gender representation in sports governance.`,
  keyHighlights: [
    { label: "Country", value: "Iran" },
    { label: "Achievement", value: "First female IOC member" },
    { label: "Sector", value: "Sports Governance" }
  ],
  sections: [
    {
      heading: "About the IOC",
      content: `The International Olympic Committee governs the Olympic Movement worldwide.`
    },
    {
      heading: "Significance of the Election",
      content: `Represents progress toward gender inclusivity in global sports institutions.`
    },
    {
      heading: "Broader Impact",
      content: `Encourages women’s participation in sports leadership roles.`
    }
  ],
  examPerspective: {
    points: [
      "Gender equality in sports",
      "Global sports governance",
      "Women leadership"
    ]
  },
  keyTakeaways: [
    "Historic IOC representation",
    "Advances gender inclusion",
    "Positive global signal"
  ],
  sources: ["IOC Announcements"]
},

"Bhutan Queen Mother Receives Upendra Nath Brahma Award": {
  introduction: `The Queen Mother of Bhutan was conferred the Upendra Nath Brahma Award in recognition of her contributions to social development and cultural harmony.`,
  keyHighlights: [
    { label: "Award", value: "Upendra Nath Brahma Award" },
    { label: "Recipient", value: "Bhutan Queen Mother" },
    { label: "Theme", value: "Social service & culture" }
  ],
  sections: [
    {
      heading: "About the Award",
      content: `The award honors individuals for outstanding contributions to social upliftment and cultural unity.`
    },
    {
      heading: "Reason for Recognition",
      content: `Her initiatives have promoted education, healthcare, and women’s empowerment.`
    },
    {
      heading: "India–Bhutan Relations",
      content: `The recognition reflects strong people-to-people ties between India and Bhutan.`
    }
  ],
  examPerspective: {
    points: [
      "India–Bhutan relations",
      "Cultural diplomacy",
      "Social leadership"
    ]
  },
  keyTakeaways: [
    "Queen Mother honored",
    "Strengthens cultural ties",
    "Highlights social leadership"
  ],
  sources: ["Award Committee Releases"]
},

"Karnataka Approves Ballot Papers for Panchayat Elections": {
  introduction: `Karnataka has approved the use of ballot papers for Panchayat elections, emphasizing transparency and voter confidence.`,
  keyHighlights: [
    { label: "State", value: "Karnataka" },
    { label: "Decision", value: "Ballot paper voting" },
    { label: "Level", value: "Panchayat elections" }
  ],
  sections: [
    {
      heading: "Background",
      content: `The decision follows demands for greater trust and accessibility in local elections.`
    },
    {
      heading: "Ballot Paper vs EVM",
      content: `Ballot papers are perceived to enhance voter confidence in grassroots elections.`
    },
    {
      heading: "Democratic Significance",
      content: `Strengthens participatory democracy at the local level.`
    }
  ],
  examPerspective: {
    points: [
      "Local self-government",
      "Election processes",
      "Grassroots democracy"
    ]
  },
  keyTakeaways: [
    "Ballot papers approved",
    "Focus on voter confidence",
    "Strengthens local democracy"
  ],
  sources: ["State Election Commission"]
},

"Trump Unveils Project Vault to Secure US Mineral Supplies": {
  introduction: `Former US President Donald Trump unveiled Project Vault, aimed at securing critical mineral supplies for strategic industries.`,
  keyHighlights: [
    { label: "Initiative", value: "Project Vault" },
    { label: "Country", value: "United States" },
    { label: "Focus", value: "Critical minerals" }
  ],
  sections: [
    {
      heading: "What is Project Vault?",
      content: `The initiative focuses on domestic mining and strategic stockpiling of key minerals.`
    },
    {
      heading: "Why Critical Minerals Matter",
      content: `They are essential for defence, electronics, and clean energy technologies.`
    },
    {
      heading: "Global Implications",
      content: `May reshape global mineral supply chains.`
    }
  ],
  examPerspective: {
    points: [
      "Critical mineral geopolitics",
      "Resource security",
      "Global supply chains"
    ]
  },
  keyTakeaways: [
    "US focuses on mineral security",
    "Strategic supply planning",
    "Global resource competition"
  ],
  sources: ["US Policy Statements"]
},

"Hakki Pikki Tribe Members Stranded in Africa Due to Visa Expiry": {
  introduction: `Members of the Hakki Pikki tribe were stranded in parts of Africa due to visa expiry, highlighting vulnerabilities faced by tribal communities abroad.`,
  keyHighlights: [
    { label: "Community", value: "Hakki Pikki Tribe" },
    { label: "Issue", value: "Visa expiry" },
    { label: "Region", value: "Africa" }
  ],
  sections: [
    {
      heading: "Who are the Hakki Pikki?",
      content: `They are a nomadic tribal community traditionally engaged in herbal trade.`
    },
    {
      heading: "Cause of the Crisis",
      content: `Travel for trade without adequate legal and diplomatic safeguards.`
    },
    {
      heading: "Government Response",
      content: `Indian authorities initiated evacuation and assistance measures.`
    }
  ],
  examPerspective: {
    points: [
      "Tribal communities",
      "Diaspora protection",
      "Consular assistance"
    ]
  },
  keyTakeaways: [
    "Tribal members stranded abroad",
    "Highlights migration vulnerabilities",
    "Need for diplomatic safeguards"
  ],
  sources: ["MEA Briefings"]
},

"Chichón Volcano Shows Renewed Hydrothermal Activity": {
  introduction: `Mexico’s Chichón Volcano has shown renewed hydrothermal activity, raising concerns about potential volcanic hazards.`,
  keyHighlights: [
    { label: "Volcano", value: "Chichón" },
    { label: "Country", value: "Mexico" },
    { label: "Activity", value: "Hydrothermal resurgence" }
  ],
  sections: [
    {
      heading: "About Chichón Volcano",
      content: `Chichón is an active volcano known for its major 1982 eruption.`
    },
    {
      heading: "What is Hydrothermal Activity?",
      content: `It involves hot fluids and gases circulating beneath the surface.`
    },
    {
      heading: "Disaster Management Angle",
      content: `Monitoring helps mitigate volcanic risks.`
    }
  ],
  examPerspective: {
    points: [
      "Volcanic activity",
      "Disaster risk management",
      "Earth sciences"
    ]
  },
  keyTakeaways: [
    "Volcanic activity observed",
    "Need for continuous monitoring",
    "Disaster preparedness essential"
  ],
  sources: ["Geological Survey Reports"]
},

"RBI Holds Repo Rate at 5.25% After Union Budget": {
  introduction: `The Reserve Bank of India retained the repo rate at 5.25% after the Union Budget, signaling continuity in monetary policy amid economic uncertainty.`,
  keyHighlights: [
    { label: "Institution", value: "Reserve Bank of India" },
    { label: "Repo Rate", value: "5.25%" },
    { label: "Context", value: "Post-Union Budget" }
  ],
  sections: [
    {
      heading: "Why Repo Rate Matters",
      content: `The repo rate influences borrowing costs, inflation, and overall economic activity.`
    },
    {
      heading: "Budget–Monetary Coordination",
      content: `Stable rates complement fiscal measures announced in the Union Budget.`
    },
    {
      heading: "Economic Outlook",
      content: `The decision aims to balance inflation control with growth support.`
    }
  ],
  examPerspective: {
    points: [
      "Monetary–fiscal coordination",
      "Inflation management",
      "RBI policy tools"
    ]
  },
  keyTakeaways: [
    "Repo rate unchanged",
    "Ensures policy stability",
    "Supports growth outlook"
  ],
  sources: ["RBI Policy Statement"]
},

"India–GCC Formalise Start of Free Trade Talks": {
  introduction: `India and the Gulf Cooperation Council (GCC) have formally launched negotiations for a Free Trade Agreement, strengthening economic ties.`,
  keyHighlights: [
    { label: "Partners", value: "India and GCC" },
    { label: "Agreement", value: "Free Trade Agreement (FTA)" },
    { label: "Sector", value: "International Trade" }
  ],
  sections: [
    {
      heading: "About the GCC",
      content: `The GCC includes Bahrain, Kuwait, Oman, Qatar, Saudi Arabia, and the UAE.`
    },
    {
      heading: "Significance of the FTA",
      content: `The agreement aims to boost trade, investment, and energy cooperation.`
    },
    {
      heading: "Strategic Importance",
      content: `GCC countries are key energy suppliers and investment partners for India.`
    }
  ],
  examPerspective: {
    points: [
      "India’s trade diplomacy",
      "FTAs and economic integration",
      "West Asia relations"
    ]
  },
  keyTakeaways: [
    "FTA talks initiated",
    "Strengthens trade ties",
    "Boosts energy security"
  ],
  sources: ["Ministry of Commerce"]
},

"ISRO Prepares for GISAT-1A Launch": {
  introduction: `ISRO is preparing for the launch of GISAT-1A, a geostationary satellite aimed at real-time Earth observation.`,
  keyHighlights: [
    { label: "Agency", value: "ISRO" },
    { label: "Satellite", value: "GISAT-1A" },
    { label: "Orbit", value: "Geostationary" }
  ],
  sections: [
    {
      heading: "Purpose of GISAT-1A",
      content: `The satellite will enable continuous monitoring of the Indian region.`
    },
    {
      heading: "Applications",
      content: `Supports disaster management, agriculture, and weather forecasting.`
    },
    {
      heading: "Strategic Value",
      content: `Enhances India’s Earth observation capabilities.`
    }
  ],
  examPerspective: {
    points: [
      "Earth observation satellites",
      "Space technology applications",
      "Disaster management"
    ]
  },
  keyTakeaways: [
    "GISAT-1A launch planned",
    "Real-time monitoring capability",
    "Boosts space infrastructure"
  ],
  sources: ["ISRO Updates"]
},

"Manipur Deputy CM Appointment Triggers Protests": {
  introduction: `The appointment of a new Deputy Chief Minister in Manipur has triggered protests, reflecting ongoing political and social tensions.`,
  keyHighlights: [
    { label: "State", value: "Manipur" },
    { label: "Issue", value: "Deputy CM appointment" },
    { label: "Concern", value: "Public protests" }
  ],
  sections: [
    {
      heading: "Background",
      content: `Manipur has witnessed prolonged ethnic and political unrest.`
    },
    {
      heading: "Reason for Protests",
      content: `Sections of society allege imbalance in political representation.`
    },
    {
      heading: "Governance Challenge",
      content: `Maintaining law and order while ensuring inclusive governance is critical.`
    }
  ],
  examPerspective: {
    points: [
      "Federal politics",
      "Internal security challenges",
      "Ethnic diversity governance"
    ]
  },
  keyTakeaways: [
    "Deputy CM appointment contested",
    "Protests reflect deeper issues",
    "Need for inclusive governance"
  ],
  sources: ["State Government Statements"]
},

"New Flowering Plant Species Discovered in Pakhal Sanctuary": {
  introduction: `Scientists have discovered a new flowering plant species in Pakhal Wildlife Sanctuary, underscoring India’s rich floral biodiversity.`,
  keyHighlights: [
    { label: "Location", value: "Pakhal Wildlife Sanctuary, Telangana" },
    { label: "Discovery", value: "New flowering plant species" },
    { label: "Sector", value: "Botany & Biodiversity" }
  ],
  sections: [
    {
      heading: "About Pakhal Sanctuary",
      content: `Pakhal is a protected forest area known for diverse flora and fauna.`
    },
    {
      heading: "Scientific Importance",
      content: `New species discoveries aid biodiversity documentation and conservation.`
    },
    {
      heading: "Conservation Angle",
      content: `Highlights the need to protect forest ecosystems.`
    }
  ],
  examPerspective: {
    points: [
      "Biodiversity hotspots",
      "Plant taxonomy",
      "Conservation science"
    ]
  },
  keyTakeaways: [
    "New plant species discovered",
    "Boosts biodiversity knowledge",
    "Supports conservation efforts"
  ],
  sources: ["Botanical Survey of India"]
},

"Indian Researchers Develop Low-Cost Biosensor for Early Heart Attack Detection": {
  introduction: `Indian researchers have developed a low-cost biosensor capable of early detection of heart attacks, offering a major breakthrough in preventive healthcare.`,
  keyHighlights: [
    { label: "Innovation", value: "Low-cost biosensor" },
    { label: "Purpose", value: "Early heart attack detection" },
    { label: "Sector", value: "Healthcare Technology" }
  ],
  sections: [
    {
      heading: "How the Biosensor Works",
      content: `The device detects cardiac biomarkers that signal an impending heart attack.`
    },
    {
      heading: "Significance for Public Health",
      content: `Early detection can significantly reduce mortality and treatment costs.`
    },
    {
      heading: "Accessibility Impact",
      content: `Affordable technology improves reach in rural and underserved areas.`
    }
  ],
  examPerspective: {
    points: [
      "Biomedical innovations",
      "Preventive healthcare",
      "Affordable health technology"
    ]
  },
  keyTakeaways: [
    "Low-cost biosensor developed",
    "Early diagnosis possible",
    "Boosts healthcare accessibility"
  ],
  sources: ["Scientific Research Publications"]
},

"Dubai to Launch Underground Dubai Loop Transport System": {
  introduction: `Dubai has announced plans to launch the underground Dubai Loop transport system to ease congestion and promote smart mobility.`,
  keyHighlights: [
    { label: "City", value: "Dubai" },
    { label: "Project", value: "Dubai Loop" },
    { label: "Sector", value: "Urban Transport" }
  ],
  sections: [
    {
      heading: "About the Dubai Loop",
      content: `The system will use underground tunnels for high-speed autonomous transport.`
    },
    {
      heading: "Urban Mobility Benefits",
      content: `Reduces surface congestion and carbon emissions.`
    },
    {
      heading: "Smart City Vision",
      content: `Aligns with Dubai’s futuristic urban development goals.`
    }
  ],
  examPerspective: {
    points: [
      "Smart cities",
      "Urban transport innovation",
      "Sustainable mobility"
    ]
  },
  keyTakeaways: [
    "Dubai Loop announced",
    "Promotes smart mobility",
    "Reduces urban congestion"
  ],
  sources: ["Dubai Government Releases"]
},

"India Develops Lead-Free Self-Powered Photodetector": {
  introduction: `Indian scientists have developed a lead-free, self-powered photodetector, advancing eco-friendly optoelectronic technologies.`,
  keyHighlights: [
    { label: "Innovation", value: "Lead-free photodetector" },
    { label: "Feature", value: "Self-powered" },
    { label: "Sector", value: "Advanced Materials" }
  ],
  sections: [
    {
      heading: "What is a Photodetector?",
      content: `It converts light signals into electrical signals used in sensors and imaging.`
    },
    {
      heading: "Environmental Advantage",
      content: `Eliminating lead reduces toxicity and environmental harm.`
    },
    {
      heading: "Potential Applications",
      content: `Useful in imaging, communication, and environmental monitoring.`
    }
  ],
  examPerspective: {
    points: [
      "Green technologies",
      "Advanced materials research",
      "Sustainable innovation"
    ]
  },
  keyTakeaways: [
    "Lead-free device developed",
    "Environment-friendly technology",
    "Boosts electronics research"
  ],
  sources: ["DST Research Updates"]
},

"Indian Railways Deploys AI System to Prevent Elephant Deaths": {
  introduction: `Indian Railways has deployed an AI-based system to detect elephants near tracks and prevent fatal train collisions.`,
  keyHighlights: [
    { label: "Agency", value: "Indian Railways" },
    { label: "Technology", value: "Artificial Intelligence" },
    { label: "Objective", value: "Wildlife protection" }
  ],
  sections: [
    {
      heading: "The Problem",
      content: `Train–elephant collisions are a major cause of wildlife fatalities.`
    },
    {
      heading: "AI-Based Solution",
      content: `Sensors and cameras detect elephant movement and alert loco pilots.`
    },
    {
      heading: "Conservation Impact",
      content: `Reduces human–wildlife conflict and protects endangered species.`
    }
  ],
  examPerspective: {
    points: [
      "AI in governance",
      "Wildlife conservation",
      "Human–animal conflict"
    ]
  },
  keyTakeaways: [
    "AI deployed for elephant safety",
    "Reduces wildlife fatalities",
    "Tech-enabled conservation"
  ],
  sources: ["Indian Railways Reports"]
},

"Esha Singh Wins Gold at Asian Shooting Championship": {
  introduction: `Indian shooter Esha Singh won a gold medal at the Asian Shooting Championship, strengthening India’s medal prospects in shooting sports.`,
  keyHighlights: [
    { label: "Athlete", value: "Esha Singh" },
    { label: "Event", value: "Asian Shooting Championship" },
    { label: "Medal", value: "Gold" }
  ],
  sections: [
    {
      heading: "Performance Overview",
      content: `Esha delivered a composed performance against strong international competitors.`
    },
    {
      heading: "Significance for India",
      content: `Adds to India’s dominance in Asian shooting events.`
    },
    {
      heading: "Olympic Pathway",
      content: `Such victories enhance confidence ahead of global events.`
    }
  ],
  examPerspective: {
    points: [
      "India’s shooting sports performance",
      "Women athletes",
      "Sports excellence"
    ]
  },
  keyTakeaways: [
    "Gold medal won",
    "Boosts India’s shooting profile",
    "Encourages youth participation"
  ],
  sources: ["National Rifle Association of India"]
},

"Rouble Nagi Wins Global Teacher Prize": {
  introduction: `Indian educator Rouble Nagi has won the Global Teacher Prize, recognizing exceptional contributions to education and social transformation.`,
  keyHighlights: [
    { label: "Award", value: "Global Teacher Prize" },
    { label: "Recipient", value: "Rouble Nagi" },
    { label: "Sector", value: "Education & Social Development" }
  ],
  sections: [
    {
      heading: "About the Global Teacher Prize",
      content: `The prize honors teachers who have made outstanding contributions to the profession worldwide.`
    },
    {
      heading: "Rouble Nagi’s Work",
      content: `Her initiatives focus on inclusive education, community engagement, and social upliftment.`
    },
    {
      heading: "Impact on Education Sector",
      content: `The recognition highlights India’s growing leadership in innovative education practices.`
    }
  ],
  examPerspective: {
    points: [
      "Role of teachers in social change",
      "Inclusive education",
      "Education reforms"
    ]
  },
  keyTakeaways: [
    "Indian teacher wins global recognition",
    "Education as tool for social upliftment",
    "Enhances India’s soft power"
  ],
  sources: ["Global Teacher Prize Committee"]
},

"Suruchi Singh and Samrat Rana Win Silver at Asian Championship": {
  introduction: `Indian shooters Suruchi Singh and Samrat Rana secured silver medals at the Asian Championship, reinforcing India’s depth in shooting sports.`,
  keyHighlights: [
    { label: "Athletes", value: "Suruchi Singh & Samrat Rana" },
    { label: "Event", value: "Asian Championship" },
    { label: "Medal", value: "Silver" }
  ],
  sections: [
    {
      heading: "Event Overview",
      content: `The Asian Championship features elite shooters from across the continent.`
    },
    {
      heading: "India’s Shooting Strength",
      content: `Consistent podium finishes reflect strong training ecosystems.`
    },
    {
      heading: "Future Prospects",
      content: `Such performances build momentum toward Olympic qualification events.`
    }
  ],
  examPerspective: {
    points: [
      "Sports training systems",
      "India’s performance in shooting",
      "International sports competitions"
    ]
  },
  keyTakeaways: [
    "India wins silver medals",
    "Strong Asian presence",
    "Encourages young shooters"
  ],
  sources: ["Sports Authority of India"]
},

"Bharat Taxi Launches Cooperative Cab Service in Delhi": {
  introduction: `Bharat Taxi has launched a cooperative cab service in Delhi aimed at empowering drivers and promoting fair earnings.`,
  keyHighlights: [
    { label: "Service", value: "Bharat Taxi" },
    { label: "Model", value: "Cooperative-based" },
    { label: "City", value: "Delhi" }
  ],
  sections: [
    {
      heading: "About the Cooperative Model",
      content: `Drivers collectively own and manage the service, reducing platform commissions.`
    },
    {
      heading: "Economic Significance",
      content: `Improves income stability and working conditions for drivers.`
    },
    {
      heading: "Urban Mobility Impact",
      content: `Adds competition and choice in the ride-hailing sector.`
    }
  ],
  examPerspective: {
    points: [
      "Cooperative movement",
      "Gig economy reforms",
      "Urban transport"
    ]
  },
  keyTakeaways: [
    "Cooperative cab service launched",
    "Empowers drivers",
    "Promotes inclusive economy"
  ],
  sources: ["Transport Sector Reports"]
},

"Exercise Khanjar Begins at Missamari, Assam": {
  introduction: `Exercise Khanjar, a joint military exercise, commenced at Missamari in Assam to enhance interoperability and combat readiness.`,
  keyHighlights: [
    { label: "Exercise", value: "Khanjar" },
    { label: "Location", value: "Missamari, Assam" },
    { label: "Sector", value: "Defence" }
  ],
  sections: [
    {
      heading: "Objective of the Exercise",
      content: `Focuses on joint operations, counter-terrorism, and tactical coordination.`
    },
    {
      heading: "Strategic Importance",
      content: `Enhances preparedness in sensitive border regions.`
    },
    {
      heading: "Defence Diplomacy",
      content: `Strengthens military cooperation and trust.`
    }
  ],
  examPerspective: {
    points: [
      "Joint military exercises",
      "Defence preparedness",
      "Border security"
    ]
  },
  keyTakeaways: [
    "Exercise Khanjar conducted",
    "Boosts combat readiness",
    "Strengthens defence ties"
  ],
  sources: ["Ministry of Defence"]
},

"US Congress Approves Security Funds for Baltic States": {
  introduction: `The US Congress has approved security funding for Baltic states, reinforcing NATO’s eastern flank and regional security.`,
  keyHighlights: [
    { label: "Countries", value: "Estonia, Latvia, Lithuania" },
    { label: "Approval", value: "US Congress" },
    { label: "Context", value: "European security" }
  ],
  sections: [
    {
      heading: "Reason for the Funding",
      content: `The move aims to counter regional security threats and enhance defence capabilities.`
    },
    {
      heading: "Geopolitical Context",
      content: `The Baltic region remains strategically sensitive amid global tensions.`
    },
    {
      heading: "Global Implications",
      content: `Signals continued US commitment to NATO allies.`
    }
  ],
  examPerspective: {
    points: [
      "NATO and regional security",
      "US foreign policy",
      "European geopolitics"
    ]
  },
  keyTakeaways: [
    "Security funding approved",
    "Strengthens Baltic defence",
    "Reaffirms NATO commitment"
  ],
  sources: ["US Congressional Records"]
},

"Karnataka Rolls Out Automatic Property Mutation System": {
  introduction: `Karnataka has introduced an automatic property mutation system to streamline land record updates and reduce disputes.`,
  keyHighlights: [
    { label: "State", value: "Karnataka" },
    { label: "System", value: "Automatic Property Mutation" },
    { label: "Sector", value: "Land Governance" }
  ],
  sections: [
    {
      heading: "What is Property Mutation?",
      content: `Mutation updates land ownership records after sale, inheritance, or transfer.`
    },
    {
      heading: "Benefits of Automation",
      content: `Reduces delays, corruption, and manual intervention.`
    },
    {
      heading: "Governance Impact",
      content: `Improves transparency and ease of doing business.`
    }
  ],
  examPerspective: {
    points: [
      "Land reforms",
      "Digital governance",
      "Ease of doing business"
    ]
  },
  keyTakeaways: [
    "Automatic mutation introduced",
    "Faster land record updates",
    "Improves transparency"
  ],
  sources: ["State Revenue Department"]
},

"NCDC Implements Yuva Sahakar and Swayamshakti Schemes": {
  introduction: `The National Cooperative Development Corporation (NCDC) has implemented Yuva Sahakar and Swayamshakti schemes to strengthen cooperatives.`,
  keyHighlights: [
    { label: "Agency", value: "NCDC" },
    { label: "Schemes", value: "Yuva Sahakar, Swayamshakti" },
    { label: "Sector", value: "Cooperative Development" }
  ],
  sections: [
    {
      heading: "About Yuva Sahakar",
      content: `Encourages youth participation in cooperative enterprises.`
    },
    {
      heading: "About Swayamshakti",
      content: `Focuses on women-led cooperative initiatives.`
    },
    {
      heading: "Economic Impact",
      content: `Supports inclusive growth and entrepreneurship.`
    }
  ],
  examPerspective: {
    points: [
      "Cooperative sector",
      "Youth and women empowerment",
      "Inclusive economic models"
    ]
  },
  keyTakeaways: [
    "Cooperative schemes implemented",
    "Boosts youth and women participation",
    "Supports inclusive growth"
  ],
  sources: ["NCDC Reports"]
},

"India Joins BRICS Industrial Competencies Centre": {
  introduction: `India has joined the BRICS Industrial Competencies Centre to enhance skill development and industrial cooperation among member countries.`,
  keyHighlights: [
    { label: "Grouping", value: "BRICS" },
    { label: "Centre", value: "Industrial Competencies Centre" },
    { label: "Focus", value: "Skill development" }
  ],
  sections: [
    {
      heading: "About the Centre",
      content: `The centre aims to harmonize industrial skills and training standards across BRICS nations.`
    },
    {
      heading: "Benefits for India",
      content: `Enhances workforce competitiveness and industrial collaboration.`
    },
    {
      heading: "Strategic Importance",
      content: `Supports Make in India and Skill India initiatives.`
    }
  ],
  examPerspective: {
    points: [
      "BRICS cooperation",
      "Skill development",
      "Industrial policy"
    ]
  },
  keyTakeaways: [
    "India joins BRICS centre",
    "Boosts skill harmonization",
    "Strengthens industrial cooperation"
  ],
  sources: ["BRICS Secretariat"]
},

"ECI to Host National Conference of State Election Commissioners": {
  introduction: `The Election Commission of India will host a national conference of State Election Commissioners to strengthen electoral governance.`,
  keyHighlights: [
    { label: "Institution", value: "Election Commission of India" },
    { label: "Event", value: "National Conference" },
    { label: "Theme", value: "Electoral reforms" }
  ],
  sections: [
    {
      heading: "Purpose of the Conference",
      content: `Facilitates exchange of best practices and coordination.`
    },
    {
      heading: "Electoral Governance",
      content: `Focus on transparency, technology use, and voter participation.`
    },
    {
      heading: "Democratic Significance",
      content: `Strengthens India’s electoral processes.`
    }
  ],
  examPerspective: {
    points: [
      "Electoral reforms",
      "Role of ECI",
      "Democratic institutions"
    ]
  },
  keyTakeaways: [
    "Conference announced",
    "Improves electoral coordination",
    "Strengthens democracy"
  ],
  sources: ["ECI Releases"]
},

"Paradip Port Authority Wins Swachhata Pakhwada Award": {
  introduction: `Paradip Port Authority has won the Swachhata Pakhwada Award for excellence in cleanliness and sanitation initiatives.`,
  keyHighlights: [
    { label: "Port", value: "Paradip Port" },
    { label: "Award", value: "Swachhata Pakhwada Award" },
    { label: "Sector", value: "Port Administration" }
  ],
  sections: [
    {
      heading: "About Swachhata Pakhwada",
      content: `It promotes cleanliness across government institutions.`
    },
    {
      heading: "Initiatives by Paradip Port",
      content: `Waste management, sanitation drives, and awareness programs.`
    },
    {
      heading: "Broader Impact",
      content: `Supports Swachh Bharat Mission objectives.`
    }
  ],
  examPerspective: {
    points: [
      "Swachh Bharat Mission",
      "Public sector efficiency",
      "Environmental hygiene"
    ]
  },
  keyTakeaways: [
    "Port wins cleanliness award",
    "Promotes sanitation culture",
    "Supports national mission"
  ],
  sources: ["Port Authority Reports"]
},

"Bharat Rang Mahotsav 25th Edition Opens in Rohtak": {
  introduction: `The 25th edition of Bharat Rang Mahotsav opened in Rohtak, celebrating India’s theatrical heritage and contemporary performing arts.`,
  keyHighlights: [
    { label: "Festival", value: "Bharat Rang Mahotsav" },
    { label: "Edition", value: "25th" },
    { label: "Location", value: "Rohtak, Haryana" }
  ],
  sections: [
    {
      heading: "About Bharat Rang Mahotsav",
      content: `It is the National School of Drama’s flagship theatre festival showcasing plays from India and abroad.`
    },
    {
      heading: "Cultural Significance",
      content: `Promotes regional languages, folk traditions, and modern theatrical expressions.`
    },
    {
      heading: "Creative Economy Impact",
      content: `Supports artists, cultural exchange, and creative industries.`
    }
  ],
  examPerspective: {
    points: [
      "Cultural festivals of India",
      "Performing arts promotion",
      "Creative economy"
    ]
  },
  keyTakeaways: [
    "25th edition inaugurated",
    "Promotes theatre culture",
    "Encourages cultural exchange"
  ],
  sources: ["Ministry of Culture"]
},

"Seychelles President to Visit India": {
  introduction: `The President of Seychelles is scheduled to visit India to strengthen bilateral relations and maritime cooperation.`,
  keyHighlights: [
    { label: "Countries", value: "India–Seychelles" },
    { label: "Visit Type", value: "Official visit" },
    { label: "Focus", value: "Maritime cooperation" }
  ],
  sections: [
    {
      heading: "Bilateral Relationship",
      content: `India and Seychelles share strong ties in defence, development, and maritime security.`
    },
    {
      heading: "Strategic Importance",
      content: `Seychelles is a key partner in the Indian Ocean Region.`
    },
    {
      heading: "Expected Outcomes",
      content: `Talks may cover security, infrastructure, and blue economy initiatives.`
    }
  ],
  examPerspective: {
    points: [
      "Indian Ocean diplomacy",
      "India’s neighbourhood policy",
      "Maritime security"
    ]
  },
  keyTakeaways: [
    "High-level diplomatic visit",
    "Strengthens IOR cooperation",
    "Enhances strategic ties"
  ],
  sources: ["MEA Announcements"]
},

"NASA Revises Jupiter's Size Using Juno Mission Data": {
  introduction: `NASA has revised estimates of Jupiter’s size using data from the Juno mission, refining understanding of the planet’s structure.`,
  keyHighlights: [
    { label: "Mission", value: "Juno" },
    { label: "Planet", value: "Jupiter" },
    { label: "Update", value: "Revised size estimate" }
  ],
  sections: [
    {
      heading: "About the Juno Mission",
      content: `Juno studies Jupiter’s gravity, magnetic field, and internal composition.`
    },
    {
      heading: "Why the Revision Matters",
      content: `Accurate measurements improve planetary models and astrophysics.`
    },
    {
      heading: "Scientific Implications",
      content: `Helps understand gas giant formation and solar system evolution.`
    }
  ],
  examPerspective: {
    points: [
      "Planetary missions",
      "Solar system studies",
      "Space science"
    ]
  },
  keyTakeaways: [
    "Jupiter’s size revised",
    "Enhances planetary science",
    "Improves mission accuracy"
  ],
  sources: ["NASA Mission Updates"]
},

"Andre Beteille Passes Away at 91": {
  introduction: `Eminent sociologist Andre Beteille passed away at the age of 91, leaving behind a lasting legacy in Indian social science.`,
  keyHighlights: [
    { label: "Personality", value: "Andre Beteille" },
    { label: "Field", value: "Sociology" },
    { label: "Age", value: "91 years" }
  ],
  sections: [
    {
      heading: "About Andre Beteille",
      content: `He was a leading Indian sociologist known for his work on caste, class, and inequality.`
    },
    {
      heading: "Academic Contributions",
      content: `His writings shaped sociological thought and public discourse in India.`
    },
    {
      heading: "Legacy",
      content: `Influenced generations of scholars and policymakers.`
    }
  ],
  examPerspective: {
    points: [
      "Indian sociologists",
      "Caste and social structure",
      "Contributions to social science"
    ]
  },
  keyTakeaways: [
    "Noted sociologist passes away",
    "Major contributor to social thought",
    "Enduring academic legacy"
  ],
  sources: ["Academic Institutions"]
},

"Milano–Cortina 2026 Alpine Skiing Schedule Announced": {
  introduction: `The alpine skiing schedule for the Milano–Cortina 2026 Winter Olympics has been officially announced.`,
  keyHighlights: [
    { label: "Event", value: "Winter Olympics 2026" },
    { label: "Host", value: "Milano–Cortina" },
    { label: "Sport", value: "Alpine skiing" }
  ],
  sections: [
    {
      heading: "About Milano–Cortina 2026",
      content: `Italy will host the 2026 Winter Olympic Games across multiple venues.`
    },
    {
      heading: "Importance of Scheduling",
      content: `Early schedules help athletes prepare and federations plan logistics.`
    },
    {
      heading: "Global Sports Significance",
      content: `The event draws worldwide attention to winter sports.`
    }
  ],
  examPerspective: {
    points: [
      "International sports events",
      "Olympic governance",
      "Sports diplomacy"
    ]
  },
  keyTakeaways: [
    "Alpine skiing schedule released",
    "Preparations intensify",
    "Global sporting interest"
  ],
  sources: ["Olympic Committee Releases"]
},

"India Issues First National Lung Cancer Care Guidelines": {
  introduction: `India has issued its first National Lung Cancer Care Guidelines to standardize diagnosis, treatment, and management across the country.`,
  keyHighlights: [
    { label: "Guidelines", value: "National Lung Cancer Care Guidelines" },
    { label: "Sector", value: "Public Health" },
    { label: "Focus", value: "Standardized cancer care" }
  ],
  sections: [
    {
      heading: "Why Lung Cancer Needs Focus",
      content: `Lung cancer is one of the leading causes of cancer-related deaths in India.`
    },
    {
      heading: "Key Features of the Guidelines",
      content: `They cover early detection, staging, treatment protocols, and follow-up care.`
    },
    {
      heading: "Healthcare Impact",
      content: `Improves uniformity and quality of cancer treatment nationwide.`
    }
  ],
  examPerspective: {
    points: [
      "Non-communicable diseases",
      "National health guidelines",
      "Cancer care infrastructure"
    ]
  },
  keyTakeaways: [
    "First national lung cancer guidelines issued",
    "Standardizes cancer care",
    "Improves patient outcomes"
  ],
  sources: ["Health Ministry Notifications"]
},

"Elon Musk Becomes World's First $800 Billion Individual": {
  introduction: `Elon Musk has become the world’s first individual to achieve a net worth of $800 billion, reflecting unprecedented wealth concentration in the technology sector.`,
  keyHighlights: [
    { label: "Person", value: "Elon Musk" },
    { label: "Net Worth", value: "$800 billion" },
    { label: "Sector", value: "Technology & Industry" }
  ],
  sections: [
    {
      heading: "Sources of Wealth",
      content: `Major contributors include electric vehicles, space technology, and AI ventures.`
    },
    {
      heading: "Economic Implications",
      content: `Raises debates around wealth inequality and taxation.`
    },
    {
      heading: "Global Context",
      content: `Reflects dominance of tech-driven business models.`
    }
  ],
  examPerspective: {
    points: [
      "Wealth inequality",
      "Role of technology entrepreneurs",
      "Global capitalism trends"
    ]
  },
  keyTakeaways: [
    "New global wealth milestone",
    "Tech sector dominance",
    "Renewed inequality debate"
  ],
  sources: ["Global Wealth Reports"]
},

"India–China Trade Reaches Record Level": {
  introduction: `Bilateral trade between India and China has reached a record level, highlighting economic interdependence despite political tensions.`,
  keyHighlights: [
    { label: "Countries", value: "India and China" },
    { label: "Status", value: "Record trade volume" },
    { label: "Sector", value: "International Trade" }
  ],
  sections: [
    {
      heading: "Trade Composition",
      content: `Includes electronics, machinery, chemicals, and consumer goods.`
    },
    {
      heading: "Strategic Contradictions",
      content: `Economic engagement continues amid geopolitical challenges.`
    },
    {
      heading: "Policy Implications",
      content: `Raises concerns about trade imbalance and supply dependence.`
    }
  ],
  examPerspective: {
    points: [
      "India–China relations",
      "Trade deficits",
      "Economic diplomacy"
    ]
  },
  keyTakeaways: [
    "Trade hits record high",
    "Economic ties remain strong",
    "Policy recalibration needed"
  ],
  sources: ["Trade Ministry Data"]
},

"World Government Summit 2026 Opens in Dubai": {
  introduction: `The World Government Summit 2026 has opened in Dubai, bringing together global leaders to discuss governance innovation and future policies.`,
  keyHighlights: [
    { label: "Event", value: "World Government Summit 2026" },
    { label: "Location", value: "Dubai" },
    { label: "Theme", value: "Future of governance" }
  ],
  sections: [
    {
      heading: "About the Summit",
      content: `The summit focuses on governance, technology, sustainability, and global cooperation.`
    },
    {
      heading: "India’s Participation",
      content: `India’s engagement highlights its growing global leadership role.`
    },
    {
      heading: "Global Significance",
      content: `Facilitates exchange of best governance practices worldwide.`
    }
  ],
  examPerspective: {
    points: [
      "Global governance platforms",
      "Public policy innovation",
      "International cooperation"
    ]
  },
  keyTakeaways: [
    "Global leaders convene",
    "Focus on governance innovation",
    "Enhances policy dialogue"
  ],
  sources: ["Summit Official Releases"]
},

"Kamakhya Ropeway Project to Boost Religious Tourism": {
  introduction: `The Kamakhya Ropeway Project is set to enhance access to the Kamakhya Temple, boosting religious tourism in Assam.`,
  keyHighlights: [
    { label: "Project", value: "Kamakhya Ropeway" },
    { label: "Location", value: "Guwahati, Assam" },
    { label: "Sector", value: "Tourism & Infrastructure" }
  ],
  sections: [
    {
      heading: "About Kamakhya Temple",
      content: `Kamakhya is one of the most revered Shakti Peethas in India.`
    },
    {
      heading: "Project Benefits",
      content: `Improves accessibility, safety, and tourist experience.`
    },
    {
      heading: "Regional Impact",
      content: `Boosts tourism-driven economic development.`
    }
  ],
  examPerspective: {
    points: [
      "Religious tourism",
      "Infrastructure development",
      "Regional economic growth"
    ]
  },
  keyTakeaways: [
    "Ropeway project announced",
    "Enhances pilgrim access",
    "Boosts local economy"
  ],
  sources: ["State Tourism Department"]
},

"Badminton Asia Team Championships Begin in Qingdao": {
  introduction: `The Badminton Asia Team Championships have begun in Qingdao, bringing together top Asian teams to compete for continental supremacy.`,
  keyHighlights: [
    { label: "Event", value: "Badminton Asia Team Championships" },
    { label: "Location", value: "Qingdao, China" },
    { label: "Category", value: "Sports – Badminton" }
  ],
  sections: [
    {
      heading: "About the Championship",
      content: `The tournament serves as a qualifier for global badminton events and showcases Asia’s top talent.`
    },
    {
      heading: "India’s Participation",
      content: `India fields strong men’s and women’s teams aiming for podium finishes.`
    },
    {
      heading: "Sporting Significance",
      content: `Enhances competitive exposure and regional sports cooperation.`
    }
  ],
  examPerspective: {
    points: [
      "International sports events",
      "India’s badminton ecosystem",
      "Sports diplomacy"
    ]
  },
  keyTakeaways: [
    "Championship begins in China",
    "High-level Asian competition",
    "Boosts badminton profile"
  ],
  sources: ["Badminton Asia"]
},

"DRDO Successfully Demonstrates SFDR Missile Technology": {
  introduction: `DRDO has successfully demonstrated Solid Fuel Ducted Ramjet (SFDR) missile technology, enhancing India’s advanced missile capabilities.`,
  keyHighlights: [
    { label: "Agency", value: "DRDO" },
    { label: "Technology", value: "SFDR missile" },
    { label: "Sector", value: "Defence Technology" }
  ],
  sections: [
    {
      heading: "What is SFDR?",
      content: `SFDR technology enables long-range, high-speed missiles with greater maneuverability.`
    },
    {
      heading: "Strategic Importance",
      content: `Enhances India’s air defence and strike capabilities.`
    },
    {
      heading: "Indigenous Development",
      content: `Demonstrates self-reliance in advanced defence technologies.`
    }
  ],
  examPerspective: {
    points: [
      "Missile propulsion technologies",
      "Defence R&D",
      "Strategic deterrence"
    ]
  },
  keyTakeaways: [
    "SFDR technology demonstrated",
    "Boosts missile performance",
    "Strengthens defence self-reliance"
  ],
  sources: ["DRDO Press Releases"]
},

"India Sends Devnimori Buddha Relics to Sri Lanka": {
  introduction: `India has sent the Devnimori Buddha relics to Sri Lanka, reinforcing cultural diplomacy and shared Buddhist heritage.`,
  keyHighlights: [
    { label: "Relics", value: "Devnimori Buddha relics" },
    { label: "Countries", value: "India and Sri Lanka" },
    { label: "Theme", value: "Cultural diplomacy" }
  ],
  sections: [
    {
      heading: "About Devnimori",
      content: `Devnimori in Gujarat is an important Buddhist archaeological site.`
    },
    {
      heading: "Diplomatic Significance",
      content: `The gesture strengthens people-to-people and cultural ties.`
    },
    {
      heading: "Soft Power Aspect",
      content: `Cultural exchanges enhance India’s regional influence.`
    }
  ],
  examPerspective: {
    points: [
      "Cultural diplomacy",
      "India–Sri Lanka relations",
      "Buddhist heritage"
    ]
  },
  keyTakeaways: [
    "Buddha relics shared",
    "Strengthens cultural ties",
    "Boosts soft power"
  ],
  sources: ["MEA Cultural Releases"]
},

"Moltbook Emerges as AI-Only Social Network Experiment": {
  introduction: `Moltbook has emerged as an experimental AI-only social network, where interactions are driven primarily by artificial intelligence.`,
  keyHighlights: [
    { label: "Platform", value: "Moltbook" },
    { label: "Concept", value: "AI-only social network" },
    { label: "Sector", value: "Technology" }
  ],
  sections: [
    {
      heading: "What Makes Moltbook Unique?",
      content: `Content creation, moderation, and interaction are AI-driven.`
    },
    {
      heading: "Opportunities and Risks",
      content: `Raises questions about ethics, authenticity, and digital trust.`
    },
    {
      heading: "Future of Social Media",
      content: `Signals experimentation in AI-led digital communities.`
    }
  ],
  examPerspective: {
    points: [
      "AI in social media",
      "Digital ethics",
      "Future of online platforms"
    ]
  },
  keyTakeaways: [
    "AI-only social network launched",
    "Tests future interaction models",
    "Raises ethical questions"
  ],
  sources: ["Technology Media Reports"]
},

"Kerala to Launch NeophyteID App for Invasive Plant Detection": {
  introduction: `Kerala is set to launch the NeophyteID mobile app to identify and monitor invasive plant species using technology.`,
  keyHighlights: [
    { label: "State", value: "Kerala" },
    { label: "App", value: "NeophyteID" },
    { label: "Focus", value: "Invasive species management" }
  ],
  sections: [
    {
      heading: "What are Invasive Species?",
      content: `They are non-native species that threaten local ecosystems.`
    },
    {
      heading: "Role of the App",
      content: `Uses image recognition to help identify invasive plants.`
    },
    {
      heading: "Environmental Impact",
      content: `Supports biodiversity conservation and ecosystem management.`
    }
  ],
  examPerspective: {
    points: [
      "Invasive species control",
      "Technology in conservation",
      "State-level environment initiatives"
    ]
  },
  keyTakeaways: [
    "NeophyteID app launched",
    "Tech-based conservation tool",
    "Protects local biodiversity"
  ],
  sources: ["Kerala Forest Department"]
},

"Explosive Eruption at Guatemala’s Volcán de Fuego": {
  introduction: `Guatemala’s Volcán de Fuego witnessed an explosive eruption, prompting emergency responses and renewed focus on volcanic hazard preparedness.`,
  keyHighlights: [
    { label: "Volcano", value: "Volcán de Fuego" },
    { label: "Country", value: "Guatemala" },
    { label: "Event", value: "Explosive eruption" }
  ],
  sections: [
    {
      heading: "About Volcán de Fuego",
      content: `It is one of Central America’s most active volcanoes, with frequent eruptions.`
    },
    {
      heading: "Impact of the Eruption",
      content: `Ash clouds, lava flows, and evacuations affected nearby communities.`
    },
    {
      heading: "Disaster Management Response",
      content: `Authorities activated emergency protocols and monitoring systems.`
    }
  ],
  examPerspective: {
    points: [
      "Volcanic hazards",
      "Disaster risk reduction",
      "Emergency preparedness"
    ]
  },
  keyTakeaways: [
    "Explosive eruption recorded",
    "Communities affected",
    "Need for constant monitoring"
  ],
  sources: ["Geological Survey Reports"]
},


"SAKSHAM 2026 Campaign Launched for Fuel Conservation": {
  introduction: `The SAKSHAM 2026 campaign has been launched to promote fuel conservation and sustainable energy practices across India.`,
  keyHighlights: [
    { label: "Campaign", value: "SAKSHAM 2026" },
    { label: "Objective", value: "Fuel conservation" },
    { label: "Sector", value: "Energy" }
  ],
  sections: [
    {
      heading: "About SAKSHAM",
      content: `SAKSHAM promotes awareness on efficient fuel use and energy sustainability.`
    },
    {
      heading: "Key Focus Areas",
      content: `Encourages behavioral change, efficiency measures, and clean fuels.`
    },
    {
      heading: "National Importance",
      content: `Supports India’s energy security and climate goals.`
    }
  ],
  examPerspective: {
    points: [
      "Energy conservation",
      "Sustainable development",
      "Climate action initiatives"
    ]
  },
  keyTakeaways: [
    "Fuel conservation campaign launched",
    "Encourages efficiency",
    "Supports climate commitments"
  ],
  sources: ["Ministry of Petroleum & Natural Gas"]
},

"India Signs Pact to Launch Bharat Container Shipping Line": {
  introduction: `India has signed an agreement to launch the Bharat Container Shipping Line to strengthen maritime logistics and reduce dependence on foreign carriers.`,
  keyHighlights: [
    { label: "Initiative", value: "Bharat Container Shipping Line" },
    { label: "Sector", value: "Maritime & Logistics" },
    { label: "Objective", value: "Self-reliance in shipping" }
  ],
  sections: [
    {
      heading: "Why the Shipping Line is Needed",
      content: `India currently relies heavily on foreign shipping lines for container transport.`
    },
    {
      heading: "Economic Significance",
      content: `Reduces logistics costs and enhances trade competitiveness.`
    },
    {
      heading: "Strategic Impact",
      content: `Strengthens maritime sovereignty and supply chain resilience.`
    }
  ],
  examPerspective: {
    points: [
      "Maritime infrastructure",
      "Atmanirbhar Bharat",
      "Logistics sector reforms"
    ]
  },
  keyTakeaways: [
    "National shipping line planned",
    "Boosts trade resilience",
    "Supports self-reliance"
  ],
  sources: ["Ministry of Ports, Shipping and Waterways"]
},

"RBI Appoints Vinay Tonse as YES Bank MD & CEO": {
  introduction: `The Reserve Bank of India has appointed Vinay Tonse as the Managing Director and CEO of YES Bank.`,
  keyHighlights: [
    { label: "Appointee", value: "Vinay Tonse" },
    { label: "Bank", value: "YES Bank" },
    { label: "Authority", value: "Reserve Bank of India" }
  ],
  sections: [
    {
      heading: "Background of the Appointment",
      content: `The appointment comes amid efforts to stabilize and strengthen YES Bank’s governance.`
    },
    {
      heading: "Role of RBI",
      content: `RBI ensures banking stability through regulatory oversight and appointments.`
    },
    {
      heading: "Banking Sector Impact",
      content: `Leadership stability is crucial for depositor confidence and growth.`
    }
  ],
  examPerspective: {
    points: [
      "Banking regulation",
      "Role of RBI",
      "Corporate governance"
    ]
  },
  keyTakeaways: [
    "New CEO appointed",
    "Focus on stability",
    "Strengthens banking governance"
  ],
  sources: ["RBI Notifications"]
},


"Walmart Becomes First Retailer to Reach $1 Trillion Valuation": {
  introduction: `Walmart has become the world’s first retailer to achieve a market valuation of $1 trillion, reflecting its global scale and digital expansion.`,
  keyHighlights: [
    { label: "Company", value: "Walmart" },
    { label: "Valuation", value: "$1 trillion" },
    { label: "Sector", value: "Retail & E-commerce" }
  ],
  sections: [
    {
      heading: "Drivers of Growth",
      content: `E-commerce expansion, logistics efficiency, and global presence contributed to the milestone.`
    },
    {
      heading: "Economic Significance",
      content: `Demonstrates transformation of traditional retail through technology.`
    },
    {
      heading: "Global Retail Trends",
      content: `Omnichannel retail is reshaping consumer markets worldwide.`
    }
  ],
  examPerspective: {
    points: [
      "Global business trends",
      "Retail sector transformation",
      "Digital commerce"
    ]
  },
  keyTakeaways: [
    "Retail valuation milestone",
    "Tech-driven growth",
    "Global market leadership"
  ],
  sources: ["Market Reports"]
},

"Spain Bans Social Media Access for Children Under 16": {
  introduction: `Spain has announced a ban on social media access for children under 16, aiming to protect minors from online harm and digital addiction.`,
  keyHighlights: [
    { label: "Country", value: "Spain" },
    { label: "Policy", value: "Social media age restriction" },
    { label: "Age Limit", value: "Under 16" }
  ],
  sections: [
    {
      heading: "Reason for the Ban",
      content: `Concerns include mental health issues, cyberbullying, and data privacy of minors.`
    },
    {
      heading: "Regulatory Approach",
      content: `Platforms will be required to enforce age verification mechanisms.`
    },
    {
      heading: "Global Context",
      content: `Several countries are considering stricter digital safety regulations for children.`
    }
  ],
  examPerspective: {
    points: [
      "Child rights in digital age",
      "Regulation of social media",
      "Cyber safety policies"
    ]
  },
  keyTakeaways: [
    "Age-based restriction imposed",
    "Focus on child protection",
    "Strengthens digital safety norms"
  ],
  sources: ["European Policy Reports"]
},

"Yumnam Khemchand Singh Sworn in as Manipur Chief Minister": {
  introduction: `Yumnam Khemchand Singh has been sworn in as the Chief Minister of Manipur amid ongoing political and social challenges.`,
  keyHighlights: [
    { label: "State", value: "Manipur" },
    { label: "Chief Minister", value: "Yumnam Khemchand Singh" },
    { label: "Context", value: "Political transition" }
  ],
  sections: [
    {
      heading: "Political Background",
      content: `The appointment follows changes in the state’s political leadership.`
    },
    {
      heading: "Key Challenges",
      content: `Maintaining peace, restoring trust, and ensuring inclusive governance remain priorities.`
    },
    {
      heading: "Federal Significance",
      content: `Stability in border states is critical for national security and integration.`
    }
  ],
  examPerspective: {
    points: [
      "State politics",
      "Federal governance",
      "Internal security"
    ]
  },
  keyTakeaways: [
    "New CM sworn in",
    "Focus on stability",
    "Governance challenges ahead"
  ],
  sources: ["State Government Notifications"]
},

"Yuki Bhambri Enters ATP Top 20 in Doubles": {
  introduction: `Indian tennis player Yuki Bhambri has entered the ATP Top 20 rankings in men’s doubles, marking a significant career milestone.`,
  keyHighlights: [
    { label: "Player", value: "Yuki Bhambri" },
    { label: "Ranking", value: "ATP Top 20 (Doubles)" },
    { label: "Sport", value: "Tennis" }
  ],
  sections: [
    {
      heading: "Career Achievement",
      content: `The ranking reflects consistent performances in international tournaments.`
    },
    {
      heading: "Impact on Indian Tennis",
      content: `Strengthens India’s presence in global doubles tennis.`
    },
    {
      heading: "Future Prospects",
      content: `Enhances chances in Grand Slams and major ATP events.`
    }
  ],
  examPerspective: {
    points: [
      "Indian athletes on global stage",
      "Tennis rankings",
      "Sports development"
    ]
  },
  keyTakeaways: [
    "Top 20 ranking achieved",
    "Boost to Indian tennis",
    "Encourages young players"
  ],
  sources: ["ATP Rankings"]
},

"Veteran Music Director SP Venkatesh Passes Away": {
  introduction: `Renowned music director SP Venkatesh passed away, marking the loss of a celebrated figure in Indian film music.`,
  keyHighlights: [
    { label: "Personality", value: "SP Venkatesh" },
    { label: "Field", value: "Film Music" },
    { label: "Contribution", value: "Indian cinema" }
  ],
  sections: [
    {
      heading: "Career Overview",
      content: `He composed music for numerous films across Indian languages.`
    },
    {
      heading: "Musical Legacy",
      content: `Known for melodic compositions and classical influences.`
    },
    {
      heading: "Cultural Impact",
      content: `His work shaped regional film music traditions.`
    }
  ],
  examPerspective: {
    points: [
      "Indian cinema",
      "Cultural contributors",
      "Music heritage"
    ]
  },
  keyTakeaways: [
    "Veteran composer passes away",
    "Rich musical legacy",
    "Significant cultural contribution"
  ],
  sources: ["Film Industry Reports"]
},

"Haven-1 Set to Become World’s First Private Space Station": {
  introduction: `Haven-1 is set to become the world’s first private space station, marking a major milestone in commercial space exploration.`,
  keyHighlights: [
    { label: "Project", value: "Haven-1" },
    { label: "Sector", value: "Commercial Spaceflight" },
    { label: "Milestone", value: "First private space station" }
  ],
  sections: [
    {
      heading: "What is Haven-1?",
      content: `A privately developed space station aimed at research and commercial missions.`
    },
    {
      heading: "Why It Matters",
      content: `Signals a shift toward privatization and commercialization of space.`
    },
    {
      heading: "Future Implications",
      content: `Opens opportunities for private research, tourism, and innovation.`
    }
  ],
  examPerspective: {
    points: [
      "Commercial space sector",
      "Public–private partnerships in space",
      "Future of space exploration"
    ]
  },
  keyTakeaways: [
    "Private space station planned",
    "Expands space economy",
    "Marks new era in spaceflight"
  ],
  sources: ["Space Industry Reports"]
},

"Mahatma Gandhi Statue Stolen in Australia": {
  introduction: `A statue of Mahatma Gandhi was stolen in Australia, triggering strong reactions from the Indian diaspora and raising concerns over vandalism of cultural symbols.`,
  keyHighlights: [
    { label: "Incident", value: "Statue theft" },
    { label: "Location", value: "Australia" },
    { label: "Concern", value: "Cultural disrespect" }
  ],
  sections: [
    {
      heading: "Background",
      content: `The statue symbolized peace, non-violence, and multicultural harmony.`
    },
    {
      heading: "Diplomatic Sensitivity",
      content: `Such incidents affect people-to-people ties and diaspora sentiments.`
    },
    {
      heading: "Response",
      content: `Local authorities initiated investigation and restoration measures.`
    }
  ],
  examPerspective: {
    points: [
      "Indian diaspora issues",
      "Cultural diplomacy",
      "International relations"
    ]
  },
  keyTakeaways: [
    "Cultural symbol targeted",
    "Diaspora concerns raised",
    "Need for cultural protection"
  ],
  sources: ["Media Reports"]
},

"IIM Udaipur Hosts India Digital Conclave 2026": {
  introduction: `IIM Udaipur hosted the India Digital Conclave 2026, focusing on digital transformation, innovation, and governance.`,
  keyHighlights: [
    { label: "Institution", value: "IIM Udaipur" },
    { label: "Event", value: "India Digital Conclave 2026" },
    { label: "Theme", value: "Digital transformation" }
  ],
  sections: [
    {
      heading: "Purpose of the Conclave",
      content: `Brings together policymakers, industry leaders, and academics.`
    },
    {
      heading: "Key Discussion Areas",
      content: `AI, digital governance, cybersecurity, and startups.`
    },
    {
      heading: "Academic Significance",
      content: `Highlights IIMs’ role in policy-oriented research.`
    }
  ],
  examPerspective: {
    points: [
      "Digital India initiatives",
      "Role of higher education institutions",
      "Technology and governance"
    ]
  },
  keyTakeaways: [
    "National digital conclave held",
    "Focus on innovation",
    "Strengthens academia–policy link"
  ],
  sources: ["IIM Udaipur Releases"]
},

"World Seafood Congress 2026 to Be Held in Chennai": {
  introduction: `The World Seafood Congress 2026 will be held in Chennai, highlighting India’s growing role in the global seafood industry.`,
  keyHighlights: [
    { label: "Event", value: "World Seafood Congress 2026" },
    { label: "Location", value: "Chennai" },
    { label: "Sector", value: "Fisheries & Trade" }
  ],
  sections: [
    {
      heading: "About the Congress",
      content: `A global platform for stakeholders in fisheries, aquaculture, and seafood trade.`
    },
    {
      heading: "Why Chennai?",
      content: `Tamil Nadu is a major hub for seafood production and exports.`
    },
    {
      heading: "Economic Impact",
      content: `Boosts investment, exports, and global collaboration.`
    }
  ],
  examPerspective: {
    points: [
      "Blue economy",
      "Fisheries sector",
      "Export-led growth"
    ]
  },
  keyTakeaways: [
    "Global congress in India",
    "Boosts seafood sector",
    "Enhances blue economy role"
  ],
  sources: ["Commerce Ministry"]
},

"X8.3 Solar Flare — Strongest of 2026": {
  introduction: `An X8.3-class solar flare, the strongest of 2026, was recorded, highlighting risks to satellites and communication systems.`,
  keyHighlights: [
    { label: "Flare Class", value: "X8.3" },
    { label: "Year", value: "2026" },
    { label: "Impact Area", value: "Space weather" }
  ],
  sections: [
    {
      heading: "What is a Solar Flare?",
      content: `A sudden release of energy from the sun affecting space-based systems.`
    },
    {
      heading: "Potential Impacts",
      content: `Can disrupt satellites, GPS, and radio communications.`
    },
    {
      heading: "Monitoring Importance",
      content: `Space weather forecasting is vital for technological safety.`
    }
  ],
  examPerspective: {
    points: [
      "Space weather",
      "Solar activity",
      "Satellite safety"
    ]
  },
  keyTakeaways: [
    "Strongest flare of the year",
    "Risk to space systems",
    "Need for monitoring"
  ],
  sources: ["Space Weather Agencies"]
},

"Anahat Singh Breaks into World Top 20 in Squash": {
  introduction: `Indian squash player Anahat Singh entered the world top 20 rankings, marking a major achievement for Indian squash.`,
  keyHighlights: [
    { label: "Athlete", value: "Anahat Singh" },
    { label: "Sport", value: "Squash" },
    { label: "Ranking", value: "World Top 20" }
  ],
  sections: [
    {
      heading: "Career Milestone",
      content: `The ranking reflects consistent international performances.`
    },
    {
      heading: "Impact on Indian Squash",
      content: `Enhances visibility and growth of squash in India.`
    },
    {
      heading: "Future Prospects",
      content: `Strengthens medal hopes in global tournaments.`
    }
  ],
  examPerspective: {
    points: [
      "Indian sports achievements",
      "Individual sports development",
      "Global rankings"
    ]
  },
  keyTakeaways: [
    "Top 20 ranking achieved",
    "Boost to Indian squash",
    "Encourages youth athletes"
  ],
  sources: ["World Squash Federation"]
},

"Census 2027 Adopts Digital-First Enumeration Framework": {
  introduction: `India’s Census 2027 will adopt a digital-first enumeration framework, marking a major shift toward technology-driven data collection.`,
  keyHighlights: [
    { label: "Census", value: "Census 2027" },
    { label: "Approach", value: "Digital-first" },
    { label: "Sector", value: "Governance & Statistics" }
  ],
  sections: [
    {
      heading: "What is Digital-First Census?",
      content: `Data will be collected using mobile devices, apps, and online self-enumeration.`
    },
    {
      heading: "Advantages",
      content: `Improves accuracy, reduces delays, and enhances data security.`
    },
    {
      heading: "Governance Impact",
      content: `Supports evidence-based planning and targeted welfare delivery.`
    }
  ],
  examPerspective: {
    points: [
      "Census methodology",
      "Digital governance",
      "Public data systems"
    ]
  },
  keyTakeaways: [
    "Digital-first census planned",
    "Faster and accurate data",
    "Modernizes statistical systems"
  ],
  sources: ["Office of the Registrar General of India"]
},

"DST Scientists Develop Photo-Rechargeable Supercapacitor": {
  introduction: `Scientists under the Department of Science and Technology (DST) have developed a photo-rechargeable supercapacitor, enabling energy storage directly from sunlight.`,
  keyHighlights: [
    { label: "Agency", value: "DST" },
    { label: "Innovation", value: "Photo-rechargeable supercapacitor" },
    { label: "Sector", value: "Energy Storage" }
  ],
  sections: [
    {
      heading: "What is a Supercapacitor?",
      content: `It stores electrical energy with rapid charge–discharge capability.`
    },
    {
      heading: "Why Photo-Rechargeable?",
      content: `It can capture and store solar energy without external power sources.`
    },
    {
      heading: "Applications",
      content: `Useful in renewable energy systems and portable electronics.`
    }
  ],
  examPerspective: {
    points: [
      "Renewable energy technologies",
      "Energy storage systems",
      "Green innovation"
    ]
  },
  keyTakeaways: [
    "Solar energy directly stored",
    "Improves energy efficiency",
    "Boosts clean tech research"
  ],
  sources: ["DST Research Updates"]
},

"India AI Impact Summit 2026 Announced": {
  introduction: `India has announced the AI Impact Summit 2026 to showcase artificial intelligence applications in governance, industry, and social sectors.`,
  keyHighlights: [
    { label: "Event", value: "India AI Impact Summit 2026" },
    { label: "Focus", value: "Artificial Intelligence" },
    { label: "Sector", value: "Technology & Policy" }
  ],
  sections: [
    {
      heading: "Purpose of the Summit",
      content: `Promotes AI-driven solutions for inclusive and sustainable growth.`
    },
    {
      heading: "Key Focus Areas",
      content: `Healthcare, agriculture, governance, education, and startups.`
    },
    {
      heading: "Global Significance",
      content: `Positions India as a responsible AI leader.`
    }
  ],
  examPerspective: {
    points: [
      "AI governance",
      "Digital India",
      "Technology diplomacy"
    ]
  },
  keyTakeaways: [
    "National AI summit announced",
    "Focus on ethical AI",
    "Boosts innovation ecosystem"
  ],
  sources: ["MeitY Announcements"]
},

"NSO to Conduct Nationwide Migration Survey": {
  introduction: `The National Statistical Office (NSO) will conduct a nationwide migration survey to assess internal and external migration trends.`,
  keyHighlights: [
    { label: "Agency", value: "NSO" },
    { label: "Survey", value: "Migration Survey" },
    { label: "Coverage", value: "Nationwide" }
  ],
  sections: [
    {
      heading: "Why Migration Data Matters",
      content: `Helps design labour, urbanization, and welfare policies.`
    },
    {
      heading: "Survey Scope",
      content: `Covers reasons, patterns, and socio-economic impact of migration.`
    },
    {
      heading: "Policy Relevance",
      content: `Supports inclusive urban and rural development planning.`
    }
  ],
  examPerspective: {
    points: [
      "Internal migration",
      "Labour economics",
      "Statistical surveys"
    ]
  },
  keyTakeaways: [
    "Migration survey planned",
    "Data-driven policy support",
    "Enhances labour planning"
  ],
  sources: ["MoSPI"]
},

"Supreme Court Orders Tribunal on Pennaiyar River Dispute": {
  introduction: `The Supreme Court has ordered the constitution of a tribunal to resolve the long-standing Pennaiyar river water dispute.`,
  keyHighlights: [
    { label: "River", value: "Pennaiyar" },
    { label: "Authority", value: "Supreme Court of India" },
    { label: "Issue", value: "Inter-state water dispute" }
  ],
  sections: [
    {
      heading: "About the Pennaiyar Dispute",
      content: `The dispute involves sharing of river waters among southern states.`
    },
    {
      heading: "Role of Water Tribunals",
      content: `Tribunals provide legal mechanisms for resolving inter-state disputes.`
    },
    {
      heading: "Federal Significance",
      content: `Ensures cooperative federalism and resource sharing.`
    }
  ],
  examPerspective: {
    points: [
      "Inter-state river disputes",
      "Judicial intervention",
      "Federal governance"
    ]
  },
  keyTakeaways: [
    "Tribunal ordered",
    "Judicial resolution mechanism",
    "Supports cooperative federalism"
  ],
  sources: ["Supreme Court Orders"]
},

"Gyan Bharatam to Preserve India’s Manuscript Heritage": {
  introduction: `The Gyan Bharatam initiative has been launched to preserve, digitize, and promote India’s vast manuscript heritage.`,
  keyHighlights: [
    { label: "Initiative", value: "Gyan Bharatam" },
    { label: "Focus", value: "Manuscript preservation" },
    { label: "Sector", value: "Culture & Heritage" }
  ],
  sections: [
    {
      heading: "Why Manuscripts Matter",
      content: `India holds millions of manuscripts covering science, philosophy, medicine, and literature.`
    },
    {
      heading: "Key Objectives",
      content: `Digitization, conservation, translation, and public access.`
    },
    {
      heading: "Cultural Significance",
      content: `Preserves traditional knowledge for future generations.`
    }
  ],
  examPerspective: {
    points: [
      "Cultural heritage conservation",
      "Digital archiving",
      "Traditional knowledge systems"
    ]
  },
  keyTakeaways: [
    "National preservation initiative",
    "Safeguards ancient knowledge",
    "Supports cultural continuity"
  ],
  sources: ["Ministry of Culture"]
},

"Gujarat Leads India in Renewable Energy Capacity": {
  introduction: `Gujarat has emerged as India’s leading state in renewable energy capacity, driven by solar and wind power expansion.`,
  keyHighlights: [
    { label: "State", value: "Gujarat" },
    { label: "Sector", value: "Renewable Energy" },
    { label: "Leadership", value: "Top capacity holder" }
  ],
  sections: [
    {
      heading: "Renewable Mix",
      content: `Includes large-scale solar parks and wind farms.`
    },
    {
      heading: "Policy Support",
      content: `Investor-friendly policies and infrastructure support.`
    },
    {
      heading: "Climate Impact",
      content: `Supports India’s clean energy and climate goals.`
    }
  ],
  examPerspective: {
    points: [
      "Renewable energy policy",
      "State-level climate action",
      "Energy transition"
    ]
  },
  keyTakeaways: [
    "Gujarat leads in renewables",
    "Boosts clean energy adoption",
    "Supports net-zero targets"
  ],
  sources: ["MNRE Data"]
},

"Andhra Pradesh Launches Pilloo AI Accounting App": {
  introduction: `Andhra Pradesh has launched the Pilloo AI-based accounting app to support MSMEs and small traders with digital bookkeeping.`,
  keyHighlights: [
    { label: "App", value: "Pilloo AI" },
    { label: "State", value: "Andhra Pradesh" },
    { label: "Target Group", value: "MSMEs" }
  ],
  sections: [
    {
      heading: "Purpose of the App",
      content: `Simplifies accounting, invoicing, and compliance using AI.`
    },
    {
      heading: "Ease of Doing Business",
      content: `Reduces dependency on manual bookkeeping.`
    },
    {
      heading: "Digital Economy Impact",
      content: `Encourages MSME digitization.`
    }
  ],
  examPerspective: {
    points: [
      "MSME digitization",
      "AI in governance",
      "Ease of doing business"
    ]
  },
  keyTakeaways: [
    "AI accounting app launched",
    "Supports MSMEs",
    "Promotes digital inclusion"
  ],
  sources: ["State IT Department"]
},

"Insolvency and Bankruptcy Code Amendment Bill Likely": {
  introduction: `The government is likely to introduce amendments to the Insolvency and Bankruptcy Code (IBC) to strengthen resolution mechanisms.`,
  keyHighlights: [
    { label: "Law", value: "IBC" },
    { label: "Focus", value: "Faster resolution" },
    { label: "Sector", value: "Corporate governance" }
  ],
  sections: [
    {
      heading: "Why Amend IBC?",
      content: `Address delays, litigation issues, and creditor concerns.`
    },
    {
      heading: "Key Reform Areas",
      content: `Time-bound resolution and improved recovery rates.`
    },
    {
      heading: "Economic Impact",
      content: `Strengthens investor confidence and credit culture.`
    }
  ],
  examPerspective: {
    points: [
      "Corporate insolvency",
      "Banking reforms",
      "Economic legislation"
    ]
  },
  keyTakeaways: [
    "IBC reform proposed",
    "Improves resolution process",
    "Boosts business confidence"
  ],
  sources: ["Finance Ministry"]
},

"India AI Impact Summit 2026 – Global AI Gathering": {
  introduction: `India AI Impact Summit 2026 will serve as a global platform for discussions on responsible and inclusive artificial intelligence.`,
  keyHighlights: [
    { label: "Event", value: "India AI Impact Summit 2026" },
    { label: "Scope", value: "Global participation" },
    { label: "Theme", value: "Responsible AI" }
  ],
  sections: [
    {
      heading: "Global Participation",
      content: `Leaders, researchers, and innovators from around the world will attend.`
    },
    {
      heading: "India’s AI Vision",
      content: `Focus on ethical, inclusive, and scalable AI solutions.`
    },
    {
      heading: "Strategic Importance",
      content: `Positions India as an AI governance leader.`
    }
  ],
  examPerspective: {
    points: [
      "AI governance",
      "Technology diplomacy",
      "Ethical AI"
    ]
  },
  keyTakeaways: [
    "Global AI platform",
    "Focus on responsible AI",
    "Enhances India’s tech leadership"
  ],
  sources: ["MeitY"]
},

"NSO Migration Survey to Inform Labour & Urban Policy": {
  introduction: `Findings from the NSO migration survey will be used to shape labour market reforms and urban planning policies.`,
  keyHighlights: [
    { label: "Agency", value: "NSO" },
    { label: "Use", value: "Policy formulation" },
    { label: "Sector", value: "Labour & Urban Development" }
  ],
  sections: [
    {
      heading: "Labour Market Insights",
      content: `Tracks movement of workers across regions and sectors.`
    },
    {
      heading: "Urban Planning Role",
      content: `Supports housing, transport, and employment planning.`
    },
    {
      heading: "Governance Value",
      content: `Data-driven policymaking improves outcomes.`
    }
  ],
  examPerspective: {
    points: [
      "Urbanization",
      "Labour migration",
      "Evidence-based policy"
    ]
  },
  keyTakeaways: [
    "Migration data informs policy",
    "Supports labour reforms",
    "Improves urban planning"
  ],
  sources: ["MoSPI"]
},

"Pennaiyar River Tribunal to Address Inter-State Water Dispute": {
  introduction: `The Pennaiyar River Tribunal will adjudicate water-sharing disputes between the concerned states.`,
  keyHighlights: [
    { label: "River", value: "Pennaiyar" },
    { label: "Mechanism", value: "Water Tribunal" },
    { label: "Issue", value: "Inter-state dispute" }
  ],
  sections: [
    {
      heading: "Tribunal Role",
      content: `Provides a legal framework for equitable water sharing.`
    },
    {
      heading: "Federal Importance",
      content: `Ensures cooperative federalism in resource management.`
    },
    {
      heading: "Long-Term Impact",
      content: `Reduces conflict and ensures sustainable usage.`
    }
  ],
  examPerspective: {
    points: [
      "Water disputes in India",
      "Tribunal mechanisms",
      "Federal governance"
    ]
  },
  keyTakeaways: [
    "Tribunal constituted",
    "Legal dispute resolution",
    "Promotes water cooperation"
  ],
  sources: ["Judicial Orders"]
},

"Gyan Bharatam Mission to Preserve Manuscript Heritage": {
  introduction: `The Gyan Bharatam Mission has been launched to systematically conserve, digitize, and revive India’s ancient manuscript traditions.`,
  keyHighlights: [
    { label: "Mission", value: "Gyan Bharatam" },
    { label: "Focus", value: "Manuscript preservation" },
    { label: "Sector", value: "Cultural Heritage" }
  ],
  sections: [
    {
      heading: "Mission Objectives",
      content: `Preservation, digitization, cataloguing, and translation of manuscripts.`
    },
    {
      heading: "Knowledge Systems",
      content: `Covers science, medicine, philosophy, astronomy, and literature.`
    },
    {
      heading: "National Importance",
      content: `Protects India’s intellectual heritage from decay and loss.`
    }
  ],
  examPerspective: {
    points: [
      "Cultural heritage preservation",
      "Traditional knowledge systems",
      "Digitization initiatives"
    ]
  },
  keyTakeaways: [
    "Mission-mode approach launched",
    "Safeguards ancient manuscripts",
    "Boosts cultural continuity"
  ],
  sources: ["Ministry of Culture"]
},

"Gujarat Emerges as India's Renewable Energy Leader": {
  introduction: `Gujarat has emerged as India’s leading state in renewable energy generation, driven by large-scale solar and wind installations.`,
  keyHighlights: [
    { label: "State", value: "Gujarat" },
    { label: "Sector", value: "Renewable Energy" },
    { label: "Leadership", value: "Top national contributor" }
  ],
  sections: [
    {
      heading: "Energy Portfolio",
      content: `Solar parks, wind corridors, and hybrid renewable projects.`
    },
    {
      heading: "Policy Framework",
      content: `Investor-friendly policies and infrastructure support.`
    },
    {
      heading: "Climate Impact",
      content: `Supports India’s net-zero and climate commitments.`
    }
  ],
  examPerspective: {
    points: [
      "Renewable energy transition",
      "State-led climate action",
      "Energy security"
    ]
  },
  keyTakeaways: [
    "Top renewable energy state",
    "Strong policy ecosystem",
    "Boosts clean power generation"
  ],
  sources: ["MNRE"]
},

"Andhra Pradesh Launches AI-Based Accounting App for MSMEs": {
  introduction: `Andhra Pradesh has launched an AI-based accounting application to help MSMEs manage finances, compliance, and bookkeeping.`,
  keyHighlights: [
    { label: "State", value: "Andhra Pradesh" },
    { label: "Technology", value: "Artificial Intelligence" },
    { label: "Beneficiaries", value: "MSMEs" }
  ],
  sections: [
    {
      heading: "App Features",
      content: `Automated bookkeeping, GST compliance, and invoice generation.`
    },
    {
      heading: "Ease of Business",
      content: `Reduces dependence on manual accounting systems.`
    },
    {
      heading: "Economic Impact",
      content: `Encourages MSME digitization and formalization.`
    }
  ],
  examPerspective: {
    points: [
      "MSME reforms",
      "AI in governance",
      "Digital economy"
    ]
  },
  keyTakeaways: [
    "AI tool for MSMEs",
    "Boosts financial inclusion",
    "Improves compliance"
  ],
  sources: ["State IT Department"]
},

"Insolvency and Bankruptcy Code Amendment Proposed": {
  introduction: `The government has proposed amendments to the Insolvency and Bankruptcy Code to improve resolution efficiency and creditor outcomes.`,
  keyHighlights: [
    { label: "Law", value: "IBC" },
    { label: "Objective", value: "Faster resolution" },
    { label: "Sector", value: "Corporate Governance" }
  ],
  sections: [
    {
      heading: "Need for Amendment",
      content: `Delays and litigation have reduced effectiveness of the IBC.`
    },
    {
      heading: "Proposed Changes",
      content: `Streamlined timelines and enhanced creditor protection.`
    },
    {
      heading: "Economic Impact",
      content: `Strengthens banking and investment confidence.`
    }
  ],
  examPerspective: {
    points: [
      "Banking reforms",
      "Corporate insolvency",
      "Economic legislation"
    ]
  },
  keyTakeaways: [
    "IBC reforms proposed",
    "Improves recovery process",
    "Boosts business environment"
  ],
  sources: ["Finance Ministry"]
},

"India–US Trade Deal Cuts Tariffs to 18 Percent": {
  introduction: `India and the United States have agreed on a trade deal reducing tariffs to 18 percent on selected goods.`,
  keyHighlights: [
    { label: "Countries", value: "India and USA" },
    { label: "Tariff Rate", value: "18%" },
    { label: "Sector", value: "International Trade" }
  ],
  sections: [
    {
      heading: "Trade Coverage",
      content: `Includes agricultural products, manufacturing goods, and services.`
    },
    {
      heading: "Economic Significance",
      content: `Boosts bilateral trade and competitiveness.`
    },
    {
      heading: "Strategic Aspect",
      content: `Strengthens economic partnership.`
    }
  ],
  examPerspective: {
    points: [
      "Bilateral trade agreements",
      "Tariff policies",
      "Economic diplomacy"
    ]
  },
  keyTakeaways: [
    "Tariffs reduced",
    "Trade relations strengthened",
    "Boosts exports"
  ],
  sources: ["Commerce Ministry"]
},

"Dalai Lama Wins Grammy Award": {
  introduction: `The Dalai Lama has won a Grammy Award for spoken word content promoting peace and compassion.`,
  keyHighlights: [
    { label: "Personality", value: "Dalai Lama" },
    { label: "Award", value: "Grammy Award" },
    { label: "Category", value: "Spoken Word" }
  ],
  sections: [
    {
      heading: "Why the Award?",
      content: `Recognizes global message of peace, mindfulness, and harmony.`
    },
    {
      heading: "Cultural Impact",
      content: `Highlights spiritual leadership in modern media.`
    },
    {
      heading: "Soft Power",
      content: `Enhances India’s civilizational influence globally.`
    }
  ],
  examPerspective: {
    points: [
      "Cultural diplomacy",
      "Global awards",
      "Soft power"
    ]
  },
  keyTakeaways: [
    "Grammy recognition",
    "Promotes peace message",
    "Cultural significance"
  ],
  sources: ["Grammy Records"]
},

"Veerabhadran Ramanathan Honoured with Nobel of Geosciences": {
  introduction: `Indian-American scientist Veerabhadran Ramanathan has been honoured with the Nobel of Geosciences for climate research.`,
  keyHighlights: [
    { label: "Scientist", value: "Veerabhadran Ramanathan" },
    { label: "Award", value: "Nobel of Geosciences" },
    { label: "Field", value: "Climate Science" }
  ],
  sections: [
    {
      heading: "Scientific Contribution",
      content: `Pioneering research on climate change and atmospheric science.`
    },
    {
      heading: "Global Impact",
      content: `Findings influenced global climate policies.`
    },
    {
      heading: "Indian Representation",
      content: `Highlights Indian contribution to global science.`
    }
  ],
  examPerspective: {
    points: [
      "Climate science",
      "Global scientific awards",
      "Environmental leadership"
    ]
  },
  keyTakeaways: [
    "Prestigious science award",
    "Climate research recognized",
    "Global scientific impact"
  ],
  sources: ["Scientific Journals"]
}

};

/* ================= DEFAULT CONTENT TEMPLATE ================= */

const getDefaultContent = (title, category) => ({
  introduction: `${title} is an important current affairs topic relevant for competitive examinations, particularly UPSC, SSC, and State PSC exams.`,
  
  keyHighlights: [
    { label: "Category", value: category },
    { label: "Context", value: "Recent development with national and international significance" },
    { label: "Relevance", value: "Policy implications and governance aspects" },
    { label: "Impact", value: "Short-term and long-term consequences" }
  ],
  
  sections: [
    {
      heading: "Background",
      content: `Understanding the historical context and previous related developments helps in comprehensive analysis of this topic.`
    },
    {
      heading: "Current Scenario",
      content: `The present situation involves multiple dimensions including administrative, technical, and social aspects that need careful consideration.`
    },
    {
      heading: "Implications",
      content: `The implications of this development extend to various sectors including governance, economy, society, and international relations.`
    }
  ],
  
  examPerspective: {
    points: [
      "Constitutional and legal framework",
      "Policy implementation and challenges",
      "Comparative analysis with similar initiatives",
      "Future prospects and recommendations"
    ]
  },
  
  practiceQuestions: [
    { 
      type: "Mains", 
      question: `Discuss the significance of this development in the context of India's ${category.toLowerCase()} sector. Analyze its impact on related stakeholders.` 
    },
    { 
      type: "Mains", 
      question: "Examine the challenges and opportunities presented by this initiative. Suggest measures for effective implementation." 
    },
    { 
      type: "Prelims", 
      question: "Multiple choice questions can focus on factual aspects, key personalities, locations, and dates associated with this topic." 
    }
  ],
  
  keyTakeaways: [
    "Understand the core concept and its significance",
    "Remember important facts, figures, and dates",
    "Analyze multi-dimensional impacts",
    "Connect with related topics for holistic understanding"
  ],
  
  sources: ["PIB", "Government Press Releases", "Official Websites"]
});

/* ================= HTML CONTENT GENERATOR ================= */

const generateHTMLContent = (title, category) => {
  const contentData = ARTICLE_CONTENT[title] || getDefaultContent(title, category);
  
  let html = `<h2>Introduction</h2>
<p>${contentData.introduction}</p>

<h2>Key Highlights</h2>
<ul>`;

  contentData.keyHighlights.forEach(item => {
    html += `
  <li><strong>${item.label}:</strong> ${item.value}</li>`;
  });

  html += `
</ul>

<h2>Detailed Analysis</h2>`;

  contentData.sections.forEach(section => {
    html += `
<h3>${section.heading}</h3>
<p>${section.content}</p>`;
  });

  html += `

<h2>Exam Perspective</h2>
<p>For UPSC and other competitive examinations, this topic can be approached from multiple angles:</p>
<ul>`;

  contentData.examPerspective.points.forEach(point => {
    html += `
  <li>${point}</li>`;
  });

  html += `
</ul>

<h3>Practice Questions</h3>
<ol>`;

  if (Array.isArray(contentData.practiceQuestions)) {
      contentData.practiceQuestions.forEach(q => {
        html += `
     <li><strong>${q.type}:</strong> ${q.question}</li>`;
  });
}

  html += `
</ol>

<h2>Key Takeaways</h2>
<ul>`;

  contentData.keyTakeaways.forEach(takeaway => {
    html += `
  <li>${takeaway}</li>`;
  });

  html += `
</ul>

<h2>Sources & References</h2>
<p>${contentData.sources.join(", ")}</p>`;

  return html;
};

/* ================= ALL ARTICLES LIST ================= */

const ARTICLE_LIST = [
  
  // PAGE 1 (FEB 10, 2026 – LATEST) 

  { title: "Manu Bhaker Wins Silver in Asian Championship 25m Pistol", category: "Sports", page: 1, imageName: "manu-bhaker-25m-pistol" },
  { title: "Modi Announces $175 Million Seychelles Development Package", category: "International", page: 1, imageName: "modi-seychelles-package" },
  { title: "ISRO Selects South Polar Site for Chandrayaan-4 Lander", category: "Science", page: 1, imageName: "chandrayaan-4-south-pole" },
  { title: "Delhi Partners Bharat Taxi for Cooperative Mobility Services", category: "Infrastructure", page: 1, imageName: "delhi-bharat-taxi" },
  { title: "New Dragonfly Species Lyriothemis keralensis Discovered in Kerala", category: "Environment", page: 1, imageName: "lyriothemis-keralensis" },
  { title: "Visually Challenged Woman Tops Kerala Judicial Service Disability Merit List", category: "Social", page: 1, imageName: "kerala-judicial-disability" },
  { title: "India, Netherlands Launch Hydrogen Fellowship, Expand Research Ties", category: "Energy", page: 1, imageName: "india-netherlands-hydrogen" },
  { title: "India, Greece Sign Pact to Boost Defence Industry Ties", category: "Defence", page: 1, imageName: "india-greece-defence-pact" },
  { title: "New Frog Species Found in Peru Faces Immediate Threat", category: "Environment", page: 1, imageName: "peru-new-frog-species" },
  { title: "RBI Approves Vijay Anandh as City Union Bank CEO", category: "Economy", page: 1, imageName: "vijay-anandh-city-union-bank" },
  { title: "Somalia–Saudi Defence Pact Deepens Gulf Rivalries", category: "International", page: 1, imageName: "somalia-saudi-defence-pact" },

  // PAGE  (FEB 9, 2026 – LATEST) - Articles 0-23
  { title: "NSO Launches MCP Server for eSankhyiki Portal", category: "Economy", page: 1, imageName: "nso-mcp-esankhyiki" },
  { title: "Two New Marine Worm Species Discovered off West Bengal Coast", category: "Environment", page: 1, imageName: "marine-worms-west-bengal" },
  { title: "INS Arnala Strengthens India's Indigenous Naval Capability", category: "Defence", page: 1, imageName: "ins-arnala-naval" },
  { title: "World's Longest Snake Recorded in Sulawesi, Indonesia", category: "Environment", page: 1, imageName: "longest-snake-sulawesi" },
  { title: "New Trapdoor Spider Species Found in Kolhapur Grasslands", category: "Environment", page: 1, imageName: "trapdoor-spider-kolhapur" },
  { title: "Sharda River Corridor Project Launched in Champawat", category: "Infrastructure", page: 1, imageName: "sharda-river-corridor" },
  { title: "Centre Plans Comprehensive Development of Kondaveedu Fort", category: "Culture", page: 1, imageName: "kondaveedu-fort" },
  { title: "India Explores New Kailash Yatra Route via Shipki La Pass", category: "International", page: 1, imageName: "kailash-yatra-shipki-la" },
  { title: "New Ant Species Discovered in Guwahati's Garbhanga Forest", category: "Environment", page: 1, imageName: "ant-species-guwahati" },
  { title: "Eurasian Otter Returns to Kashmir via LoC Waterways", category: "Environment", page: 1, imageName: "eurasian-otter-kashmir" },
  { title: "International Epilepsy Day 2026 Observed Globally", category: "Health", page: 1, imageName: "epilepsy-day-2026" },
  { title: "India Clinch SAFF U-19 Women's Championship Title", category: "Sports", page: 1, imageName: "saff-u19-women" },
  { title: "Chess Added to Esports Nations Cup 2026 Line-up", category: "Sports", page: 1, imageName: "chess-esports-nations-cup" },
  { title: "Wool Production in India: States, Types and Industry Profile", category: "Geography", page: 1, imageName: "wool-production-india" },
  { title: "Himachal CM Launches 'Padhai with AI' Initiative", category: "Education", page: 1, imageName: "padhai-with-ai" },
  { title: "Azista Space Achieves India's First In-Orbit Snooping Capability", category: "Science", page: 1, imageName: "azista-space-orbit" },
  { title: "Anutin Charnvirakul Wins Thailand Snap Election", category: "International", page: 1, imageName: "thailand-election" },
  { title: "Sanae Takaichi Secures Supermajority in Japan Election", category: "International", page: 1, imageName: "japan-election" },
  { title: "Arjun Ram Meghwal Launches The Medicolegal Guidebook", category: "Polity", page: 1, imageName: "medicolegal-guidebook" },
  { title: "Queensland Moves to Ban Pro-Palestinian Slogans", category: "International", page: 1, imageName: "queensland-ban" },
  { title: "Cardinal Poola Anthony Elected CBCI President", category: "Culture", page: 1, imageName: "cbci-president" },
  { title: "India Ranks Second Globally in LEED-Certified Green Realty", category: "Environment", page: 1, imageName: "leed-green-realty" },

  // PAGE 2 (FEB 8) - Articles 24-32
  { title: "Meghana Sajjanar Wins Asian Shooting Championships Bronze", category: "Sports", page: 2, imageName: "meghana-sajjanar-bronze" },
  { title: "India–US Trade Pact Cuts Duties on Wines and Dry Fruits", category: "Economy", page: 2, imageName: "india-us-trade-pact" },
  { title: "RSS Flag March from Kashmir to Kanyakumari", category: "Polity", page: 2, imageName: "rss-flag-march" },
  { title: "Cancer Cells Reprogramme Immune Cells to Aid Tumour Growth", category: "Science", page: 2, imageName: "cancer-cells-research" },
  { title: "South Africa Launches First Local FMD Vaccine in 20 Years", category: "Science", page: 2, imageName: "south-africa-fmd-vaccine" },
  { title: "PM Modi Begins Two-Day Official Visit to Malaysia", category: "International", page: 2, imageName: "pm-modi-malaysia" },
  { title: "India's Forex Reserves Hit Record High", category: "Economy", page: 2, imageName: "forex-reserves" },
  { title: "US Removes Additional 25% Tariffs on Indian Goods", category: "Economy", page: 2, imageName: "us-tariffs-removal" },
  { title: "VOC Port Becomes First in India to Deploy Anti-Drone System", category: "Defence", page: 2, imageName: "voc-port-anti-drone" },

  // PAGE 3 (FEB 7) - Articles 33-42
  { title: "RCB Clinches Second Women's Premier League Title", category: "Sports", page: 3, imageName: "rcb-wpl-title" },
  { title: "Surajkund International Crafts Mela Highlights Artisan Self-Reliance", category: "Culture", page: 3, imageName: "surajkund-crafts-mela" },
  { title: "Delhi Police Launches Operation Shastra", category: "Polity", page: 3, imageName: "operation-shastra" },
  { title: "India Wins Record Sixth ICC U-19 Cricket World Cup", category: "Sports", page: 3, imageName: "india-u19-world-cup" },
  { title: "NASA's SPHEREx Detects Organic Molecules in Interstellar Comet", category: "Science", page: 3, imageName: "nasa-spherex-comet" },
  { title: "RBI Keeps Repo Rate Unchanged at 5.25%", category: "Economy", page: 3, imageName: "rbi-repo-rate" },
  { title: "Global Push to End Female Genital Mutilation", category: "Social", page: 3, imageName: "end-fgm" },
  { title: "Alwar Achieves 100% Insurance Coverage", category: "Social", page: 3, imageName: "alwar-insurance" },
  { title: "Iran Reaffirms Support for Chabahar Port Project", category: "International", page: 3, imageName: "chabahar-port" },
  { title: "Government Rejects Lowering Age of Consent", category: "Polity", page: 3, imageName: "age-of-consent" },

  // PAGE 4 (FEB 6) - Articles 43-52
  { title: "Goa Becomes Second State to Publish Bird Atlas", category: "Environment", page: 4, imageName: "goa-bird-atlas" },
  { title: "Delhi Ranked Second Most Polluted City in January: CREA", category: "Environment", page: 4, imageName: "delhi-pollution" },
  { title: "Arun Icecreams Sets Guinness World Record in Hyderabad", category: "Economy", page: 4, imageName: "arun-icecreams-guinness" },
  { title: "Amaravati Quantum Valley Project Launched in Andhra Pradesh", category: "Technology", page: 4, imageName: "amaravati-quantum-valley" },
  { title: "China Clears Limited Rare Earth Exports to Japan", category: "International", page: 4, imageName: "china-rare-earth" },
  { title: "India Successfully Test-Fires Agni-III Ballistic Missile", category: "Defence", page: 4, imageName: "agni-iii-missile" },
  { title: "Tamil Nadu Launches Urban Greening Policy", category: "Environment", page: 4, imageName: "tamil-nadu-greening" },
  { title: "Iran's First Female Member Elected to IOC", category: "Sports", page: 4, imageName: "iran-ioc-female" },
  { title: "Bhutan Queen Mother Receives Upendra Nath Brahma Award", category: "Culture", page: 4, imageName: "bhutan-queen-award" },
  { title: "Karnataka Approves Ballot Papers for Panchayat Elections", category: "Polity", page: 4, imageName: "karnataka-ballot-papers" },

  // PAGE 5 (FEB 5) - Articles 53-62
  { title: "Trump Unveils Project Vault to Secure US Mineral Supplies", category: "International", page: 5, imageName: "project-vault-trump" },
  { title: "Hakki Pikki Tribe Members Stranded in Africa Due to Visa Expiry", category: "Social", page: 5, imageName: "hakki-pikki-tribe" },
  { title: "Chichón Volcano Shows Renewed Hydrothermal Activity", category: "Geography", page: 5, imageName: "chichon-volcano" },
  { title: "RBI Holds Repo Rate at 5.25% After Union Budget", category: "Economy", page: 5, imageName: "rbi-repo-rate-budget" },
  { title: "India–GCC Formalise Start of Free Trade Talks", category: "International", page: 5, imageName: "india-gcc-trade" },
  { title: "ISRO Prepares for GISAT-1A Launch", category: "Science", page: 5, imageName: "isro-gisat-1a" },
  { title: "Manipur Deputy CM Appointment Triggers Protests", category: "Polity", page: 5, imageName: "manipur-deputy-cm" },
  { title: "New Flowering Plant Species Discovered in Pakhal Sanctuary", category: "Environment", page: 5, imageName: "pakhal-plant-species" },
  { title: "Indian Researchers Develop Low-Cost Biosensor for Early Heart Attack Detection", category: "Science", page: 5, imageName: "heart-attack-biosensor" },
  { title: "Dubai to Launch Underground Dubai Loop Transport System", category: "Infrastructure", page: 5, imageName: "dubai-loop" },

  // PAGE 6 (FEB 4) - Articles 63-77
  { title: "India Develops Lead-Free Self-Powered Photodetector", category: "Science", page: 6, imageName: "lead-free-photodetector" },
  { title: "Indian Railways Deploys AI System to Prevent Elephant Deaths", category: "Environment", page: 6, imageName: "railways-ai-elephant" },
  { title: "Esha Singh Wins Gold at Asian Shooting Championship", category: "Sports", page: 6, imageName: "esha-singh-gold" },
  { title: "Rouble Nagi Wins Global Teacher Prize", category: "Social", page: 6, imageName: "rouble-nagi-teacher-prize" },
  { title: "Suruchi Singh and Samrat Rana Win Silver at Asian Championship", category: "Sports", page: 6, imageName: "suruchi-samrat-silver" },
  { title: "Bharat Taxi Launches Cooperative Cab Service in Delhi", category: "Economy", page: 6, imageName: "bharat-taxi" },
  { title: "Exercise Khanjar Begins at Missamari, Assam", category: "Defence", page: 6, imageName: "exercise-khanjar" },
  { title: "US Congress Approves Security Funds for Baltic States", category: "International", page: 6, imageName: "us-baltic-security" },
  { title: "Karnataka Rolls Out Automatic Property Mutation System", category: "Polity", page: 6, imageName: "karnataka-property-mutation" },
  { title: "NCDC Implements Yuva Sahakar and Swayamshakti Schemes", category: "Economy", page: 6, imageName: "ncdc-schemes" },
  { title: "India Joins BRICS Industrial Competencies Centre", category: "International", page: 6, imageName: "brics-industrial" },
  { title: "ECI to Host National Conference of State Election Commissioners", category: "Polity", page: 6, imageName: "eci-conference" },
  { title: "Paradip Port Authority Wins Swachhata Pakhwada Award", category: "Culture", page: 6, imageName: "paradip-swachhata" },
  { title: "Bharat Rang Mahotsav 25th Edition Opens in Rohtak", category: "Culture", page: 6, imageName: "bharat-rang-mahotsav" },
  { title: "Seychelles President to Visit India", category: "International", page: 6, imageName: "seychelles-president" },

  // PAGE 7 (FEB 3) - Articles 78-89
  { title: "NASA Revises Jupiter's Size Using Juno Mission Data", category: "Science", page: 7, imageName: "nasa-jupiter-juno" },
  { title: "Andre Beteille Passes Away at 91", category: "Culture", page: 7, imageName: "andre-beteille" },
  { title: "Milano–Cortina 2026 Alpine Skiing Schedule Announced", category: "Sports", page: 7, imageName: "milano-cortina-skiing" },
  { title: "India Issues First National Lung Cancer Care Guidelines", category: "Health", page: 7, imageName: "lung-cancer-guidelines" },
  { title: "Elon Musk Becomes World's First $800 Billion Individual", category: "Economy", page: 7, imageName: "elon-musk-800b" },
  { title: "India–China Trade Reaches Record Level", category: "Economy", page: 7, imageName: "india-china-trade" },
  { title: "World Government Summit 2026 Opens in Dubai", category: "International", page: 7, imageName: "world-govt-summit" },
  { title: "Kamakhya Ropeway Project to Boost Religious Tourism", category: "Infrastructure", page: 7, imageName: "kamakhya-ropeway" },
  { title: "Badminton Asia Team Championships Begin in Qingdao", category: "Sports", page: 7, imageName: "badminton-asia" },
  { title: "DRDO Successfully Demonstrates SFDR Missile Technology", category: "Defence", page: 7, imageName: "drdo-sfdr-missile" },
  { title: "India Sends Devnimori Buddha Relics to Sri Lanka", category: "Culture", page: 7, imageName: "devnimori-relics" },
  { title: "Moltbook Emerges as AI-Only Social Network Experiment", category: "Technology", page: 7, imageName: "moltbook-ai" },

  // PAGE 8 (FEB 2) - Articles 90-99
  { title: "Kerala to Launch NeophyteID App for Invasive Plant Detection", category: "Environment", page: 8, imageName: "neophyteid-app" },
  { title: "Explosive Eruption at Guatemala's Volcán de Fuego", category: "Geography", page: 8, imageName: "volcan-de-fuego" },
  { title: "SAKSHAM 2026 Campaign Launched for Fuel Conservation", category: "Energy", page: 8, imageName: "saksham-2026" },
  { title: "India Signs Pact to Launch Bharat Container Shipping Line", category: "Infrastructure", page: 8, imageName: "bharat-container-shipping" },
  { title: "RBI Appoints Vinay Tonse as YES Bank MD & CEO", category: "Economy", page: 8, imageName: "vinay-tonse-yes-bank" },
  { title: "Walmart Becomes First Retailer to Reach $1 Trillion Valuation", category: "Economy", page: 8, imageName: "walmart-1-trillion" },
  { title: "Spain Bans Social Media Access for Children Under 16", category: "Social", page: 8, imageName: "spain-social-media-ban" },
  { title: "Yumnam Khemchand Singh Sworn in as Manipur Chief Minister", category: "Polity", page: 8, imageName: "manipur-cm" },
  { title: "Yuki Bhambri Enters ATP Top 20 in Doubles", category: "Sports", page: 8, imageName: "yuki-bhambri-atp" },
  { title: "Veteran Music Director SP Venkatesh Passes Away", category: "Culture", page: 8, imageName: "sp-venkatesh" },

  // PAGE 9 (FEB 1) - Articles 100-108
  { title: "Haven-1 Set to Become World's First Private Space Station", category: "Science", page: 9, imageName: "haven-1-space-station" },
  { title: "Mahatma Gandhi Statue Stolen in Australia", category: "International", page: 9, imageName: "gandhi-statue-australia" },
  { title: "IIM Udaipur Hosts India Digital Conclave 2026", category: "Education", page: 9, imageName: "iim-digital-conclave" },
  { title: "World Seafood Congress 2026 to Be Held in Chennai", category: "Economy", page: 9, imageName: "seafood-congress" },
  { title: "X8.3 Solar Flare — Strongest of 2026", category: "Science", page: 9, imageName: "solar-flare-x8" },
  { title: "Anahat Singh Breaks into World Top 20 in Squash", category: "Sports", page: 9, imageName: "anahat-singh-squash" },
  { title: "India–US Trade Deal Cuts Tariffs to 18 Percent", category: "Economy", page: 9, imageName: "india-us-tariffs" },
  { title: "Dalai Lama Wins Grammy Award", category: "Culture", page: 9, imageName: "dalai-lama-grammy" },
  { title: "Veerabhadran Ramanathan Honoured with Nobel of Geosciences", category: "Science", page: 9, imageName: "ramanathan-nobel" },

  // PAGE 10 (JAN 31) - Articles 109-117
  { title: "Census 2027 Adopts Digital-First Enumeration Framework", category: "Polity", page: 10, imageName: "census-2027-digital" },
  { title: "DST Scientists Develop Photo-Rechargeable Supercapacitor", category: "Science", page: 10, imageName: "supercapacitor" },
  { title: "India AI Impact Summit 2026 Announced", category: "Technology", page: 10, imageName: "ai-impact-summit" },
  { title: "NSO to Conduct Nationwide Migration Survey", category: "Social", page: 10, imageName: "migration-survey" },
  { title: "Supreme Court Orders Tribunal on Pennaiyar River Dispute", category: "Polity", page: 10, imageName: "pennaiyar-tribunal" },
  { title: "Gyan Bharatam to Preserve India's Manuscript Heritage", category: "Culture", page: 10, imageName: "gyan-bharatam" },
  { title: "Gujarat Leads India in Renewable Energy Capacity", category: "Environment", page: 10, imageName: "gujarat-renewable" },
  { title: "Andhra Pradesh Launches Pilloo AI Accounting App", category: "Technology", page: 10, imageName: "pilloo-ai-app" },
  { title: "Insolvency and Bankruptcy Code Amendment Bill Likely", category: "Economy", page: 10, imageName: "ibc-amendment" },

  // PAGE 11 (JAN 30) - Articles 118-125
  { title: "India AI Impact Summit 2026 – Global AI Gathering", category: "Technology", page: 11, imageName: "ai-summit-global" },
  { title: "NSO Migration Survey to Inform Labour & Urban Policy", category: "Social", page: 11, imageName: "nso-migration-policy" },
  { title: "Pennaiyar River Tribunal to Address Inter-State Water Dispute", category: "Polity", page: 11, imageName: "pennaiyar-dispute" },
  { title: "Gyan Bharatam Mission to Preserve Manuscript Heritage", category: "Culture", page: 11, imageName: "gyan-bharatam-mission" },
  { title: "Gujarat Emerges as India's Renewable Energy Leader", category: "Environment", page: 11, imageName: "gujarat-energy-leader" },
  { title: "Andhra Pradesh Launches AI-Based Accounting App for MSMEs", category: "Technology", page: 11, imageName: "ap-ai-accounting" },
  { title: "Insolvency and Bankruptcy Code Amendment Proposed", category: "Economy", page: 11, imageName: "ibc-amendment-proposed" }
];

/* ================= FINAL BUILD ================= */

const allArticles = ARTICLE_LIST.map((article, index) => {
  const articleDate = getArticleDate(article.page);
  
  return {
    title: article.title,
    slug: `${index + 1}-${article.title.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`,
    summary: `Comprehensive analysis of ${article.title} with exam-oriented insights for UPSC, SSC, and State PSC aspirants.`,
    content: generateHTMLContent(article.title, article.category),
    category: article.category,
    tags: TAGS[article.category] || ["UPSC"],

    featuredImage: {
    url: IMAGE_MAP[article.imageName] ?? IMAGE_MAP["default"],
    alt: article.title
    },

    publishDate: articleDate,
    lastUpdated: articleDate,
    readingTime: "6 min",
    author: "Admin",
    examRelevance: ["UPSC", "SSC", "State PSC"],
    difficulty: ["Beginner", "Intermediate", "Advanced"][index % 3],
    sources: ["PIB", "Government Releases", "Official Statements"],
    viewCount: 0,
    likes: 0,
    pageNumber: article.page
  };
});

export default allArticles;