import React, { useEffect, useState } from "react";
import FormInput from "../forms/FormInput";
import { useDispatch, useSelector } from "react-redux";
import {
  signUpUserStart,
  resetErrorMessages,
} from "./../../redux/User/user.actions";
import Button from "../forms/Button";
import Modal from "./../../components/Modal";
import CircularProgress from "@material-ui/core/CircularProgress";
import "./styles.scss";
import AuthWrapper from "../AuthWrapper";
import { Link, useHistory } from "react-router-dom";
import globalStyles from "../../globalStyles";
import { Checkbox } from "@material-ui/core";

const TERMS = "";

const mapState = ({ user }) => ({
  currentUser: user.currentUser,
  userErr: user.userErr,
});

const SignUp = (props) => {
  const { currentUser, userErr } = useSelector(mapState);
  const dispatch = useDispatch();
  const history = useHistory();
  const [hideModal, setHideModal] = useState(true);
  const [accept, setAccept] = useState(false);
  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const [acceptErrMsg, setAcceptErrMsg] = useState(false);
  const [loading, setLoading] = useState(false);

  const REGISTER = "Registrera";

  const toggleModal = () => setHideModal(!hideModal);

  const configModal = {
    hideModal,
    toggleModal,
  };

  useEffect(() => {
    if (currentUser) {
      resetForm();
      history.push("/products");
    }
  }, [currentUser, history]);

  useEffect(() => {
    if (Array.isArray(userErr) && userErr.length > 0) {
      setErrors(userErr);
      setLoading(false);
    }
  }, [userErr]);

  const resetForm = () => {
    setLoading(false);
    setAccept(false);
    setAcceptErrMsg(false);
    setDisplayName("");
    setEmail("");
    setPassword("");
    setConfirmPassword("");
    setErrors([]);
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    if (accept) {
      setAcceptErrMsg(false);
      setLoading(true);
      dispatch(
        signUpUserStart({
          displayName,
          email,
          password,
          confirmPassword,
        })
      );
    } else if (!accept) {
      setAcceptErrMsg(true);
    }
  };

  const goBack = () => {
    dispatch(resetErrorMessages());
  };

  const configAuthWrapper = {
    headline: "Skapa konto",
    text: "Skapa ett konto om du vill kunna se dina ordar och få nyhetsbrev",
  };

  return (
    <AuthWrapper {...configAuthWrapper}>
      <Modal {...configModal}>
        <div>
          <p style={{ textAlign: "justify" }}>
            Om Trädition Företaget har sitt säte utanför Kopparberg, i
            Ljusnarsbergs kommun. Företagets postadress är Östra Löa 430. Önskar
            du att komma i kontakt med oss, skicka ett mail till
            elias.elmstrom@gmail.com med ditt ärende och dina kontaktuppgifter
            så hör vi av oss inom kort. Beställning När du slutfört din
            beställning skickas en orderbekräftelse till din e-postadress. I
            bekräftelsen finner du alla uppgifter om produkter, pris,
            fakturerings- och leveransadress. Bekräftelsen finns även att tillgå
            med din personliga inloggning på hemsidan. Är något fel i
            orderbekräftelsen ska du omedelbart kontakta oss via e-post till
            elias.elmstrom@gmail.com. Leverans - Våra normala leveranstider är
            3-10 dagar. OBS! Beställningar lagda på helger skickas tidigast på
            måndagen efter. Om förseningar i leveransen skulle uppstå (utan att
            vi har meddelat dig om längre leveranstid) ska du kontakta oss på
            e-postadress: elias.elmstrom@gmail.com. Priser - Alla priser i
            butiken anges i SEK och alla priser är inklusive 25% moms. Vi
            reserverar oss för prisändringar orsakat av feltryck i prislistan
            samt felaktigheter i priser beroende på felaktig information och
            förbehåller oss rätten att justera priset. Ångerrätt Vid köp av
            varor på webbplatsen har du som kund en lagstiftad 14 dagars
            ångerrätt som gäller från det att du har tagit emot en vara som du
            har beställt. 5.1 Vid nyttjande av din ångerrätt: Du måste meddela
            att du ångrar dig. Meddelandet ska skickas till oss
            elias.elmstrom@gmail.com. I ditt meddelande ska ditt namn, din
            adress, e-postadress, ordernumret samt vilka varor som returneringen
            gäller framgå klart och tydligt. Du bör snarast möjligt och senast
            inom lagstiftad 14 dagar efter ångermeddelandet returnera
            produkterna till oss. Du står för returfrakt, leverans och skick på
            produkterna vid retur, produkterna bör därför skickas välpaketerade
            och i ursprunglig förpackning. På återbetalningsbeloppet förbehåller
            vi oss rätten att dra av en summa motsvarande värdeminskningen
            jämfört med varans ursprungliga värde vid använd eller skadad
            produkt. 5.2 Ångerrätten gäller inte vid: Specialtillverkad produkt,
            som har skräddarsytts särskilt åt dig eller har en tydlig personlig
            prägel efter dina önskemål. Reklamation och klagomål (Bör detta vara
            med?) Vi besiktigar alla produkter innan dessa skickas till dig.
            Skulle produkten ändå vara skadad eller felexpedierad när den
            anländer åtar vi oss i enlighet med gällande
            konsumentskyddslagstiftning att kostnadsfritt åtgärda felet. Du
            måste alltid kontakta oss för ett godkännande innan du returnerar en
            defekt vara. Klagomålet ska skickas omedelbart efter att defekten
            har upptäckts. 6.1 Hur går du tillväga vid reklamation? Eventuella
            fel och defekt ska alltid reklameras till elias.elmstrom@gmail.com
            där du anger ditt namn, din adress, e-postadress, ordernummer och en
            beskrivning av felet. Om det inte lyckas oss att åtgärda felet eller
            leverera en liknande produkt, återbetalar vi dig för den defekta
            produkten i enlighet med gällande konsumentskyddslagstiftning. Vi
            står för returfrakt vid godkända reklamationer. Vi förbehåller oss
            rätten att neka en reklamation om det visar sig att varan inte är
            felaktig i enlighet med gällande konsumentskyddslagstiftning. Vid
            reklamationer följer vi riktlinjer från Allmänna
            Reklamationsnämnden, se arn.se. Ansvarsbegränsning Vi tar inget
            ansvar för indirekta skador som kan uppstå på grund av produkten.
            Produktinformation Vi reserverar oss för eventuella tryckfel på
            denna webbplats samt slutförsäljning av produkter. Vi garanterar
            inte att bilderna återger produkternas exakta utseende då en viss
            färgskillnad kan förekomma beroende på bildskärm, fotokvalitet samt
            upplösning. Vi försöker alltid på bästa sätt att exponera
            produkterna så korrekt som möjligt. Information om Cookies Enligt
            lag om elektronisk information ska besökare på en webbplats i
            integritetssyfte få information om att cookies används.
            Informationen i cookien är möjlig att använda för att följa en
            användares surfande. Cookie är en liten textfil som webbplatsen du
            besöker begär att få spara på din dator för att ge tillgång till
            olika funktioner. Det går att ställa in sin webbläsare så att den
            automatiskt nekar cookies. Mer information kan man hitta på Post och
            telestyrelsens hemsida. Personuppgifter Genom att handla hos
            Trädition accepterar du vår dataskyddspolicy och vår behandling av
            dina personuppgifter. Vi värnar om din personliga integritet och
            samlar inte in fler uppgifter än nödvändigt för att behandla din
            beställning. Vi säljer eller vidareger aldrig dina uppgifter till
            tredjepart utan rättslig grund. Trädition är ansvarig för
            behandlingen av personuppgifter som du lämnat till oss som kund.
            Dina personuppgifter behandlas av oss för att kunna hantera din
            beställning samt i de tillfällen då du har önskat nyhetsbrev eller
            kampanjerbjudanden - för att kunna anpassa marknadsföringen åt dina
            individuella behov. Nedan information är en summering av hur vi i
            enlighet med dataskyddsförordningen (GDPR) lagrar och behandlar dina
            uppgifter. 10.1 Vad är en personuppgift? En personuppgift är all
            information som direkt eller indirekt kan hänföras till en fysisk
            person. 10.2 Vilka uppgifter lagrar vi? För att kunna hantera din
            beställning samt svara på frågor relaterat till din order
            (kundtjänst) lagrar vi ditt förnamn- och efternamn, adress, postort,
            land, telefonnummer, e-postadress, och köphistorik. Då köpet går via
            betaltjänsten Stripe lagras köpuppgifterna även hos dem. För mer
            information om hur Stripe hanterar personuppgifter, läs här. Dina
            uppgifter lagras så länge vi har en rättslig grund att behandla dina
            uppgifter, exempelvis för att fullfölja avtalet mellan oss eller för
            att efterleva en rättslig förpliktelse enligt exempelvis
            bokföringslagen. 10.3 Rättslig grund I samband med ett köp behandlas
            dina personuppgifter för att fullfölja avtalet med dig.
            Marknadsföring, kampanjer och liknande utskick sker efter samtycke
            från dig. 10.4 Vilka uppgifter delas och med vilket syfte? 10.4.1
            Betalleverantör Vid genomförande av köp, delas information med vår
            betalleverantör Stripe. Det som lagras är förnamn, efternamn,
            adress, e-postadress och telefonnummer. Väljer du att betala med
            faktura sparas även personnummer hos betalleverantören.
            Informationen sparas för att kunna genomföra köpet och för att
            skydda parterna mot bedrägeri. De betalleverantörer (betaltjänster)
            som vi använder oss av är: Stripe. 10.4.2 Fraktbolag För att kunna
            leverera dina beställningar och slutföra vårt avtal måste vi dela
            med specifik information med fraktbolaget. Det som delas med
            fraktbolaget är förnamn, efternamn samt adressuppgifter för
            leverans. E-postadress och/eller mobilnummer kan även komma att
            delas med fraktbolaget för avisering. De fraktbolag vi samarbetar
            med är: Postnord. 10.4.3 Nyhetsbrev Har du valt att prenumerera på
            vårt nyhetsbrev delas förnamn, efternamn och e-postadress med vår
            nyhetsbrevsleverantör. Detta för att kunna hålla dig uppdaterad med
            information och erbjudanden i marknadsföringssyfte. Vi använder för
            utskick av nyhetsbrev. 10.5 Rätten till tillgång Du har rätt att få
            utdrag av all information som finns om dig hos oss. Utdrag levereras
            elektroniskt i ett läsbart format. 10.6 Rätt till rättelse Du har
            rätt att be oss uppdatera felaktig information eller komplettera
            information som är bristfällig. 10.7 Rätten att bli glömd Du kan när
            som helst be att uppgifterna som avser dig raderas. Det finns få
            undantag till rätten till radering, som till exempel om det ska
            behållas för att vi måste uppfylla en rättslig förpliktelse
            (exempelvis enligt bokföringslagen). 10.8 Ansvarig för dataskydd
            Trädition är ansvarig för lagring och behandling av personuppgifter
            i webbutiken och ser till att reglerna efterföljs. 10.9 Så skyddar
            vi dina personuppgifter Vi använder oss av industristandarder som
            SSL/TLS och envägs hash-algoritmer för att lagra, behandla och
            kommunicera känslig information som exempelvis personuppgifter och
            lösenord på ett säkert sätt. Vi använder en svensk plattform,
            Quickbutik, som drivs av Quickbutik AB med säte i Helsingborg.
            Ändringar till de Allmänna Villkoren Vi förbehåller oss rätten att
            när som helst företa ändringar i villkoren. Ändringar av villkoren
            kommer att publiceras online på webbplatsen. De ändrade villkoren
            anses för accepterade i samband med order eller besök på
            webbplatsen. Tvist och lagval I tillfälle av att tvist inte kan
            lösas i samförstånd med företagets kundtjänst och kunden, kan du som
            kund vända dig till Allmänna Reklamationsnämnden, se arn.se. För
            boende i ett annat EU-land än Sverige kan man lämna klagomål online
            via EU-kommissionens plattform för medling i tvister, se
            http://ec.europa.eu/consumers/odr Vid eventuell tvist följer vi
            beslut från ARN eller motsvarande tvistlösningsorgan. Tvist gällande
            tolkningen eller tillämpningen av dessa allmänna villkor ska tolkas
            i enlighet med svensk rätt och lag.
          </p>
          <Button onClick={() => toggleModal()}>Stäng</Button>
        </div>
      </Modal>

      {acceptErrMsg ? (
        <ul>
          <li>Du måste acceptera villkoren för att bli medlem.</li>
        </ul>
      ) : null}

      {errors.length > 0 && (
        <ul>
          {errors.map((err, index) => {
            return <li key={index}>{err}</li>;
          })}
        </ul>
      )}

      <div className="formWrap">
        <form onSubmit={handleFormSubmit}>
          <FormInput
            type="text"
            name="displayName"
            value={displayName}
            placeholder="För- och efternamn"
            handleChange={(e) => setDisplayName(e.target.value)}
          />
          <FormInput
            type="text"
            name="email"
            value={email}
            placeholder="Email"
            handleChange={(e) => setEmail(e.target.value)}
          />
          <FormInput
            type="password"
            name="password"
            value={password}
            placeholder="Lösenord"
            handleChange={(e) => setPassword(e.target.value)}
          />
          <FormInput
            type="password"
            name="confirmPassword"
            value={confirmPassword}
            placeholder="Bekräfta lösenord"
            handleChange={(e) => setConfirmPassword(e.target.value)}
          />

          <div className="terms">
            <Checkbox checked={accept} onChange={() => setAccept(!accept)} />
            <span>
              Genom att bli medlem godkänner du våra{" "}
              <span
                style={{ color: globalStyles.primary }}
                className="link"
                onClick={toggleModal}
              >
                användarvillkor
              </span>
              .
            </span>
          </div>

          <Button type="submit">
            {loading ? (
              <CircularProgress size={20} style={{ color: "white" }} />
            ) : (
              REGISTER
            )}
          </Button>
          <div className="links">
            <Link
              to="/login"
              onClick={() => goBack()}
              style={{ color: globalStyles.secondary }}
            >
              Tillbaka
            </Link>
          </div>
        </form>
      </div>
    </AuthWrapper>
  );
};

export default SignUp;
