import { CssBaseline, ThemeProvider } from '@mui/material';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import App from './App';
import MultiProvider from './Config/MultiProvider';
import Provider from './Context';
import reportWebVitals from './reportWebVitals';
import Themes from './Themes/Mui';

const root = createRoot(document.getElementById('root'));

root.render(
	<BrowserRouter>
		<MultiProvider
			providers={[
				<Provider.ProfileProvider key={1} />,
				<Provider.CheckupProvider key={1} />,
				<Provider.DailyWorkProvider key={2} />,
				<Provider.DailyWorkPlanningProvider key={2} />,
				<Provider.TrainDriverProvider key={3} />,
				<Provider.GonoGoItemProvider key={4} />,
				<Provider.BriefingProvider key={5} />,
				<Provider.MasterMedicalProvider key={6} />,
				<Provider.CabinRideProvider key={7} />,
				<Provider.AbsenceProvider key={8} />,
				<Provider.PreliminaryReportProvider key={9} />,
				<Provider.CoachingProvider key={10} />,
				<Provider.DailyIncidentProvider key={11} />,
				<Provider.AssessmentProvider key={12} />,
				<Provider.InformationUploadProvider key={13} />,
				<Provider.IncidentProvider key={14} />,
				<Provider.StationMasterProvider key={15} />,
				<Provider.AttendanceProvider key={16} />,
				<Provider.LetterProvider key={17} />,
				<Provider.TrainRouteProvider key={18} />,
				<Provider.DinasanProvider key={19} />,
				<Provider.UserProfilProvider key={20} />,
				<Provider.StasiunProvider key={21} />,
				<Provider.NoGoItemProvider key={22} />,
				<Provider.CabinRideNewProvider key={23} />,
				<Provider.MasterLrvProvider key={24} />,
				<Provider.CabinEntryProvider key={25} />,
				<Provider.LangsirProvider key={26} />,
				<Provider.WAMProvider key={27} />,
				<Provider.PPPKAProvider key={27} />,
				<Provider.MasterEmergencyProvider key={28} />,
				<Provider.EmergencyProvider key={29} />,
				<Provider.PTWProvider key={30} />,
				<Provider.WscProvider key={31} />,
				<Provider.ChecklistPAwalProvider key={32} />,
				<Provider.DailyOperationProvider key={33} />,
				<Provider.MasterDailyOperationProvider key={34} />,
				<Provider.MonitoringScadaProvider key={35} />,
				<Provider.TrafficReadinessProvider key={36} />,
				<Provider.StamformasiProvider key={37} />,
				<Provider.MasterDataIncidentProvider key={38} />,
			]}
		>
			<ThemeProvider theme={Themes.default}>
				<CssBaseline />
				<App />
			</ThemeProvider>
		</MultiProvider>
		,
	</BrowserRouter>
);

reportWebVitals();
