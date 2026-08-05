export interface QA {
  q: string;
  a: string[];
}

/** Avalehe KKK – kõige laiemad küsimused. */
export const FAQ_GENERAL: QA[] = [
  {
    q: "Milliseid dokumente on metsa müügiks vaja?",
    a: [
      "Päringu tegemiseks piisab katastritunnusest – kõik muu vaatame ise välja. Metsaregistri andmed, kinnistusraamatu väljavõtte ja kitsenduste kontrolli teeme sinu eest ära.",
      "Tehinguks läheb vaja kehtivat isikut tõendavat dokumenti ja abielus olles abikaasa nõusolekut, kui kinnistu on ühisvara. Kui kinnistu on päritud, peab pärimine olema vormistatud ja omanik kinnistusraamatusse kantud – vajadusel selgitame, kuidas seda korda ajada.",
    ],
  },
  {
    q: "Kuidas metsakinnistu hind kujuneb?",
    a: [
      "Peamine on puistu tegelik seis: puuliigid, vanus, boniteet, tagavara tihumeetrites ja see, kui suur osa metsast on raieküps. Sama suured kinnistud võivad seetõttu hinnalt mitmekordselt erineda.",
      "Lisaks arvestame kitsendusi (kaitseala, piiranguvöönd, vääriselupaik, servituudid), ligipääsu ja teede seisukorda, pinnavorme ja märgalasid ning kinnistu asukohta. Hindamine on tasuta ja saad alati teada, millest hind koosneb.",
    ],
  },
  {
    q: "Kas saan müüa kinnistut, millel on hüpoteek?",
    a: [
      "Jah. Hüpoteek ei takista müüki – see kustutatakse tehingu käigus. Ostuhinnast tasutakse esmalt pangale laenujääk ja ülejäänud summa laekub sulle.",
      "Kogu asjaajamise pangaga ja notariga korraldame meie, sina pead ainult tehingul kohal olema.",
    ],
  },
  {
    q: "Kas metsa müügilt tuleb tulumaksu maksta?",
    a: [
      "Füüsilise isiku puhul maksustatakse üldjuhul kasu ehk müügihinna ja soetusmaksumuse ning müügiga seotud kulude vahe. Metsamaterjali ja raieõiguse võõrandamisest saadud tulust saab teatud tingimustel maha arvata kuni 5000 eurot aastas.",
      "Palju sõltub sellest, kuidas maa on omandatud (ost, pärimine, erastamine, tagastamine). Kuna maksureeglid muutuvad, tasub oma olukord üle kontrollida Maksu- ja Tolliameti lehel või maksunõustajaga – meie oskame öelda, millega tavaliselt arvestatakse, kuid maksunõustamist me ei paku.",
    ],
  },
  {
    q: "Kas kaasomandis oleva metsa saab müüa?",
    a: [
      "Terve kinnistu müügiks on vaja kõigi kaasomanike nõusolekut. Oma mõttelise osa võib müüa ka üksi, kuid teistel kaasomanikel on ostueesõigus.",
      "Ostame ka mõttelisi osi ja meil on kogemust olukordadest, kus kaasomanikke on palju või nad elavad eri paigus. Aitame läbirääkimistel ja vormistamisel.",
    ],
  },
  {
    q: "Mis vahe on kinnistu ja raieõiguse müügil?",
    a: [
      "Kinnistu müügil läheb maa koos metsaga uuele omanikule ja saad kogu väärtuse korraga kätte. Raieõiguse müügil müüd ainult õiguse kokkulepitud alal raiuda – maa jääb sinu nimele ja pärast raiet saad seda edasi majandada.",
      "Kui sa pole kindel, kumb sinu jaoks kasulikum on, arvutame mõlemad variandid läbi ja näitame numbrid kõrvuti.",
    ],
  },
  {
    q: "Kui kaua tehing aega võtab?",
    a: [
      "Hinnapakkumise saad 24 tunni jooksul. Notariaalse tehinguni jõutakse tavaliselt 1–3 nädalaga, sõltuvalt sellest, kui kiiresti dokumendid korras on ja millal notaril aeg on. Kiirel juhul oleme tehingu vormistanud ka mõne päevaga.",
      "Raha laekub tehingu sõlmimisel – hüpoteegiga kinnistu puhul pärast seda, kui pangaga on arveldatud.",
    ],
  },
  {
    q: "Kes maksab notaritasud?",
    a: [
      "Notaritasu ja riigilõivu tasume meie. Sulle jääb kokkulepitud ostuhind – varjatud kulusid ega vahendustasusid ei ole.",
    ],
  },
  {
    q: "Kas hindamine maksab midagi ja kas see kohustab mind?",
    a: [
      "Hindamine ja konsultatsioon on täiesti tasuta ega kohusta sind millekski. Saad konkreetse numbri, mille põhjal otsustada – ka siis, kui otsustad mitte müüa või pakkumisi võrrelda.",
    ],
  },
  {
    q: "Kas ostate ka väikeseid või läbiraiutud kinnistuid?",
    a: [
      "Jah. Ostame nii alla hektari suuruseid tükke kui ka juba läbiraiutud maad, noorendikke ja võsastunud kinnistuid. Just neid on tavapärasel teel kõige keerulisem müüa, seetõttu tasub meiega kindlasti rääkida.",
    ],
  },
  {
    q: "Mis metsast pärast müüki saab?",
    a: [
      "Majandame metsa vastutustundlikult ja seaduse järgi: raiume ainult metsateatise alusel, korrastame raiealad ja uuendame need uue metsapõlvega. Meie eesmärk ei ole tühjaks raiutud maa, vaid mets, mis kasvab edasi.",
    ],
  },
];

export const FAQ_METSAKINNISTU: QA[] = [
  {
    q: "Kui suuri metsakinnistuid te ostate?",
    a: [
      "Ostame nii alla ühe hektari suurusi tükke kui ka sadade hektarite suuruseid massiive. Väikese kinnistu puhul on hektarihind sageli madalam, sest raie- ja transpordikulud jagunevad väiksemale mahule – aga pakkumise teeme igal juhul.",
    ],
  },
  {
    q: "Ostate ka läbiraiutud või noorendikuga kinnistut?",
    a: [
      "Jah. Läbiraiutud maa, noorendik ja võsastunud kinnistu on meie jaoks tavaline ost. Nende väärtus on pikaajaline: hindame kasvava metsapõlve potentsiaali, mulla boniteeti ja uuendamiskulu.",
      "Just neid kinnistuid on eraturul kõige raskem müüa, sest kohest raietulu ei ole. Meie vaatame pikemat perspektiivi ja teeme ka sellisele maale konkreetse pakkumise.",
    ],
  },
  {
    q: "Mis saab kinnistul olevast hüpoteegist või servituudist?",
    a: [
      "Hüpoteeki ei pea sa enne müüki ise korda ajama – see kustutatakse tehingu käigus. Pank saab oma osa otse ostuhinnast ja ülejäänu kantakse sulle.",
      "Servituut (nt juurdepääsutee või tehnovõrk) jääb üldjuhul kehtima ja seda arvestame hinnas. Ütleme alati välja, kui palju mingi kitsendus hinda mõjutab.",
    ],
  },
  {
    q: "Kas päritud metsa saab kohe müüa?",
    a: [
      "Müüa saab siis, kui pärimine on vormistatud ja pärija on kinnistusraamatusse omanikuna kantud. Kui see on veel tegemata, selgitame, milliseid samme notari juures teha – oleme seda protsessi paljude klientidega läbi käinud.",
      "Kui pärijaid on mitu, saab müüa ka kaasomandis: kas kõik koos või oma mõtteline osa eraldi.",
    ],
  },
  {
    q: "Kas ma pean ise metsa hindama või takseerandmeid tellima?",
    a: [
      "Ei pea. Piisab katastritunnusest – metsaregistri takseerandmed, kinnistusraamatu andmed ja kitsendused vaatame ise. Kui takseerandmed on vanad või puuduvad, hindame puistut kaardimaterjali ja vajadusel kohapealse ülevaatuse põhjal.",
    ],
  },
  {
    q: "Kas peame kinnistut koos kohapeal vaatamas käima?",
    a: [
      "Enamasti mitte – enamiku pakkumistest teeme andmete põhjal. Suuremate või keerulisemate kinnistute puhul käime ise kohapeal. Sina ei pea kaasa tulema, kuid oled alati oodatud.",
    ],
  },
];

export const FAQ_RAIEOIGUS: QA[] = [
  {
    q: "Millal on raieõiguse müük kasulikum kui kinnistu müük?",
    a: [
      "Siis, kui tahad metsast tulu saada, aga maad ei soovi käest anda – näiteks kui kinnistu on sugulastelt päritud, kodu kõrval või pikaajaline investeering.",
      "Kui su eesmärk on kogu vara korraga rahaks teha, on kinnistu müük tavaliselt lihtsam. Kahtluse korral tasub lasta mõlemad summad välja arvutada ja alles siis otsustada.",
    ],
  },
  {
    q: "Millal raha laekub?",
    a: [
      "Raha laekub enne raie algust. Soovi korral saab kokku leppida ka osamaksetes – näiteks osa lepingu sõlmimisel ja ülejäänu enne tööde algust.",
    ],
  },
  {
    q: "Kes ajab metsateatise ja load korda?",
    a: [
      "Meie. Raie toimub Keskkonnaametile esitatud metsateatise alusel ja metsaseaduse nõuete järgi. Vajalikud teatised, kooskõlastused ja teavitused ajame ise korda ning hoiame sind kursis.",
    ],
  },
  {
    q: "Mis seisus mets pärast raiet jääb?",
    a: [
      "Ala jääb korrastatuna – raiejäätmed saavad koristatud ja masinateed tasandatud, nii et uuendamisega saab kohe edasi minna.",
      "Soovi korral võtame enda peale ka uue metsapõlve rajamise, nii et sa ei pea selleks eraldi tegijat otsima.",
    ],
  },
  {
    q: "Kas leping vormistatakse notaris?",
    a: [
      "Jah, alati. Notaritasu tasume meie ja kõik kokkulepped saavad kirja, nii et hiljem ei teki eriarvamust selles, mida ja kus tohib raiuda.",
    ],
  },
  {
    q: "Kui pikk on raieõiguse tähtaeg?",
    a: [
      "Tähtaeg lepitakse kokku lepingus, tavaliselt üks kuni kaks aastat. Varu on vajalik selleks, et töid saaks teha pinnasele kõige sobivamal ajal.",
    ],
  },
];

export const FAQ_POLLUMAA: QA[] = [
  {
    q: "Millist põllumaad te ostate?",
    a: [
      "Ostame haritavat põllumaad, rohumaid, kasutusest väljas olevaid ja võsastunud maatükke ning maatulundusmaad, millel leidub ka metsaosa.",
    ],
  },
  {
    q: "Mul on maa rendile antud – kas saan ikka müüa?",
    a: [
      "Jah. Müük ei katkesta rendilepingut – see läheb uue omanikuga edasi samadel tingimustel. Anna päringus teada lepingu tähtaeg, siis arvestame selle kohe pakkumisse.",
    ],
  },
  {
    q: "Millest sõltub põllumaa hind?",
    a: [
      "Kõige rohkem mullaviljakusest ehk boniteedist – see määrab saagikuse ja seega maa väärtuse. Järgmisena loevad põllu kuju, kuivenduse korrasolek ja juurdepääs, sest need määravad, kui odav on maad masinatega harida.",
    ],
  },
  {
    q: "Kas ostueesõigus võib müüki takistada?",
    a: [
      "Mõnel juhul on seadusest või lepingust tulenevalt kellelgi ostueesõigus – näiteks kaasomanikul. Kontrollime selle enne tehingut üle ja korraldame vajalikud teavitused, nii et tehing jääks kindlalt kehtima.",
    ],
  },
  {
    q: "Kas ostate ka väikeseid põllumaatükke?",
    a: [
      "Jah, ka üksikuid hektareid. Väiksema tüki puhul mõjutab hinda eriti palju see, kas tükk piirneb teiste haritavate maadega ja kas sinna saab masinatega ligi.",
    ],
  },
];

export const FAQ_HINNAKUJUNDUS: QA[] = [
  {
    q: "Miks ei ole veebilehel hinnakirja hektari kohta?",
    a: [
      "Sest keskmine hektarihind eksitab. Kaks ühesuurust kinnistut võivad väärtuselt mitmekordselt erineda – kõik sõltub puuliikidest, vanusest, tagavarast ja kitsendustest. Aus vastus on konkreetne pakkumine sinu kinnistule, mitte üldine number.",
    ],
  },
  {
    q: "Millest pakkumise hind koosneb?",
    a: [
      "Aluseks on kasvava metsa väärtus: raieküpse puistu tagavara tihumeetrites, puuliikide jaotus ja sortimendid, millest saab arvutada eeldatava raietulu. Sellest lahutatakse raie-, kokkuveo- ja transpordikulud ning arvestatakse noorendike ja uuendamata alade pikaajaline väärtus ja maa enda väärtus.",
      "Kitsendused, halb ligipääs ja märg pinnas vähendavad hinda, sest raie läheb kallimaks või on ajaliselt piiratud. Näitame need punktid pakkumises välja, et saaksid aru, kust number tuleb.",
    ],
  },
  {
    q: "Kas hindamine on tasuta?",
    a: [
      "Jah, hindamine ja konsultatsioon on tasuta ega kohusta sind millekski. Ka siis, kui kasutad meie numbrit ainult teiste pakkumistega võrdlemiseks, on see meie jaoks korras.",
    ],
  },
  {
    q: "Kui kaua pakkumine kehtib?",
    a: [
      "Tavaliselt kaks nädalat. Puiduturu hinnad liiguvad, seetõttu ei saa me pakkumist lõputult lahti hoida – kui tähtaeg jääb kitsaks, anna teada ja vaatame üle.",
    ],
  },
  {
    q: "Kas hinna üle saab läbi rääkida?",
    a: [
      "Saab. Kui sul on kinnistu kohta infot, mida meie andmetest ei näe – näiteks värskem takseerimine, tehtud hooldusraie või uus juurdepääsutee – anna teada ja arvutame pakkumise üle.",
    ],
  },
  {
    q: "Kas pean pakkumise kohe vastu võtma?",
    a: [
      "Ei. Võta rahulikult aega ja küsi paralleelselt ka teistelt ostjatelt – see on sinu õigus ja meie jaoks täiesti tavaline.",
    ],
  },
];

export const FAQ_METSAMAJANDAMINE: QA[] = [
  {
    q: "Mis on metsamajandamiskava ja kas seda on vaja?",
    a: [
      "Metsamajandamiskava on kümneks aastaks koostatud plaan, mis näitab eraldiste kaupa, mida ja millal metsas teha. See on aluseks raiete planeerimisel ja paljude toetuste taotlemisel ning annab omanikule selge ülevaate oma metsa seisust.",
    ],
  },
  {
    q: "Millal teha valgustus- ja millal harvendusraie?",
    a: [
      "Valgustusraie käib noorendikus, kus tuleb parematele puudele ruumi teha. Harvendusraie aeg on käes siis, kui võrad hakkavad kokku puutuma ja juurdekasv aeglustub.",
      "Mõlemal on kitsas ajaaken: hilinenud hooldust ei saa tagantjärele tasa teha, sest kaotatud juurdekasvu mets tagasi ei anna.",
    ],
  },
  {
    q: "Kas aitate ka istutamise ja kultuuri hooldusega?",
    a: [
      "Jah, teeme kogu ahela: maapinna ettevalmistuse, taimede tellimise, istutuse ja hilisema hoolduse. Noore kultuuri juurde käime tagasi seni, kuni mets on omal jalal.",
    ],
  },
  {
    q: "Kas saate abiks olla metsandustoetuste taotlemisel?",
    a: [
      "Aitame metsateatiste esitamisel ja metsanduslike toetuste taotlemisel. Toetusmeetmed ja tähtajad muutuvad aastate lõikes, seetõttu vaatame alati üle, mis parasjagu avatud on.",
    ],
  },
];

export const FAQ_KONTAKT: QA[] = [
  {
    q: "Kui kiiresti te päringule vastate?",
    a: [
      "Hiljemalt ööpäevaga, tööpäevadel enamasti mõne tunniga. Kui sul on kiire, helista otse – nii saab enamiku küsimusi kohe selgeks rääkida.",
    ],
  },
  {
    q: "Mida peaksin päringus kirja panema?",
    a: [
      "Kõige olulisem on katastritunnus – selle järgi leiame kõik ülejäänud andmed ise. Lisaks aitab, kui kirjutad, kas soovid müüa kinnistut või raieõigust ja kui kiire sul on.",
      "Kui katastritunnust käepärast ei ole, piisab ka kinnistu asukohast – aitame tunnuse ise üles otsida.",
    ],
  },
  {
    q: "Kas kontorisse saab kohale tulla?",
    a: [
      "Jah, oleme Viljandis Lossi tn 15. Palume enne helistada ja aeg kokku leppida, sest sageli oleme metsas või tehingul. Vajadusel sõidame ise sinu juurde.",
    ],
  },
  {
    q: "Kas te ostate ainult Viljandimaal?",
    a: [
      "Ei. Kontor on Viljandis, aga tehinguid teeme üle Eesti – kõigis 15 maakonnas, sealhulgas saartel.",
    ],
  },
];

export const FAQ_MAAKONNAD: QA[] = [
  {
    q: "Kas ostate metsa üle kogu Eesti?",
    a: [
      "Jah, kõigis 15 maakonnas – ka Saaremaal ja Hiiumaal. Ainus, mis asukohast sõltub, on see, kui kiiresti jõuame soovi korral kohapeale.",
    ],
  },
  {
    q: "Kas kaugemal asuva kinnistu eest saab vähem?",
    a: [
      "Ei – asukoha enda eest me hinda ei vähenda. Vahe tekib ainult veokuludest ja need näitame pakkumises eraldi real välja.",
    ],
  },
  {
    q: "Kui kiiresti jõuate kinnistut vaatama?",
    a: [
      "Viljandimaal ja naabermaakondades tavaliselt paari päevaga. Kaugemale sõidame kokkuleppel – kuid enamiku pakkumistest teeme niikuinii andmete põhjal, ilma et peaksime ootama kohapealset ülevaatust.",
    ],
  },
];
