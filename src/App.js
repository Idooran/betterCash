import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { ThemeProvider } from "@material-ui/styles";
import { makeStyles } from "@material-ui/core/styles";

import Home from "./components/Home";
import ContactUs from "./components/ContactUs";
import InformationPage from "./components/InformationPage";

import theme from "./theme";
import Footer from "./components/Footer";
import NotFound from "./components/NotFound";

const useStyles = makeStyles((theme) => ({
  container: {
    backgroundColor: "black",
    height: "100vh",
    display: "flex",
    flexDirection: "column",
  },
}));

function App() {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <ThemeProvider theme={theme}>
        <Router>
          <Switch>
            <Route exact path="/contact-us">
              <ContactUs />
            </Route>
            <Route exact path="/tos">
              <InformationPage
                title="Term Of Service"
                text="Lorem ipsum dolor sit amet, utroque referrentur pro ad. In verear honestatis usu, wisi quando perpetua mea ex. Ne duis ubique vel, eos doming laboramus an, vim eu etiam dicant singulis. Et eam amet mentitum appetere. Usu cu erroribus philosophia, et qui harum verear dissentias, et eros etiam scaevola his.

Porro everti quo et. Ea sit vero reque nobis, eum ad epicurei scriptorem, cibo ferri quaestio ne eum. Eos torquatos tinciduant ad. Illum laudem habemus nec ei, ad has scripta propriae assueverit. Nobis homero delicatissimi has te, ancillae adolescens ut ius.

Ius ad munere nullam voluptatibus, mei latine impetus sapientem te. Placerat fabellas efficiantur no sit. No sea atqui veritus deseruisse. Impetus oporteat assueverit mei ei, suscipit indoctum persecuti in est. Doming verear adolescens vel no. Sea verterem antiopam eu, et vim semper atomorum.

Sit alii graeco at, in legere accommodare vel, omnis viris putent id vis. Vim quodsi accusam argumentum te, ad probatus torquatos deterruisset duo, nam ei omnis recusabo maluisset. Duo assum mediocrem adolescens ut, at mei quod nibh liber, eos quis omittam eu. His eu utroque expetenda, cum erant expetendis et. Ne posse tibique mea, diam fabellas quaestio cum ne, mel ei apeirian iracundia forensibus.

Vix at malis eripuit feugiat, wisi ocurreret ne vix. An mediocrem intellegebat quo. Eos et noster salutatus. Eam ne novum graecis partiendo, est vidisse detraxit posidonium cu. At exerci dolorem definiebas quo. Eum cetero saperet reprehendunt te, eam ex dolorem atomorum scripserit, cu pro tamquam mentitum constituto."
              ></InformationPage>
            </Route>
            <Route exact path="/help">
              <InformationPage title="help" text="adfglkjhadlkjhgkjadjhkgrdjlk" />
            </Route>
            <Route exact path="/privacy">
              <InformationPage title="privacy" text="adfglkjhadlk jhgkjadjhkgrdjlk" />
            </Route>
            <Route exect path="/not-found">
              <NotFound />
            </Route>
            <Route path="/" component={Home}></Route>
          </Switch>
          {<Footer />}
        </Router>
      </ThemeProvider>
    </div>
  );
}

export default App;
