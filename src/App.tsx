import React from 'react';
import { StyledEngineProvider } from "@mui/styled-engine";
import { Route, Routes } from "react-router-dom";

import HomePage from "./pages/HomePageComponent/HomePage-Component";
import ProfilePage from "./pages/ProfilePageComponent/ProfilePage-Component";
import BrowsePage from "./pages/BrowsePageComponent/BrowsePage-Component";
import LoginPage from "./pages/LoginPageComponent/LoginPage-Component";
import EditorPage from "./pages/EditorPageComponent/EditorPage-Component";
import RegisterPage from "./pages/RegisterPageComponent/RegisterPage-Component";
import ExpandPage from "./pages/ExpandPageComponent/ExpandPage-Component";
import SecureRoute from "./components/SecureRoute/SecureRoute-Component";

import './App.scss';

export class App extends React.Component<any, any> {
    componentDidMount() {
        // this.props.purge() //for testing with persistance (and logout)
    }

    render() {
        return (
            <StyledEngineProvider injectFirst>
                <div className="App">
                    <Routes>
                        <Route path="/login" element={<LoginPage />} />
                        <Route path="/register" element={<RegisterPage />} />
                        <Route path="/" element={<HomePage />} />
                        <Route path="/browse" element={<BrowsePage />} />


                        <Route path="/profile"
                            element={
                                <SecureRoute>
                                    <ProfilePage />
                                </SecureRoute>
                            } />

                        <Route path="/editor"
                            element={
                                <SecureRoute>
                                    <EditorPage />
                                </SecureRoute>
                            } />

                        <Route path="/projects/:projectId/view"
                            element={
                                <SecureRoute>
                                    <ExpandPage />
                                </SecureRoute>
                            } />
                    </Routes>
                </div>
            </StyledEngineProvider>
        );
    }
}
export default App;
