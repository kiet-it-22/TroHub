import React, { useEffect, useState } from "react";
import { View, StyleSheet, SafeAreaView, ActivityIndicator } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import BottomNav from "../components/BottomNav";
import LoginScreen from "../screens/LoginScreen";
import HomeScreen from "../screens/HomeScreen";
import InvoiceScreen from "../screens/InvoiceScreen";
import RepairScreen from "../screens/RepairScreen";
import ContractScreen from "../screens/ContractScreen";
import AccountScreen from "../screens/AccountScreen";
import UtilityScreen from "../screens/UtilityScreen";
import ProfileScreen from "../screens/ProfileScreen";

type Tab =
  | "home"
  | "invoice"
  | "repair"
  | "contract"
  | "account"
  | "utility"
  | "profile";

const LOGIN_KEY = "TROHUB_IS_LOGGED_IN";

export default function App() {
  const [isCheckingLogin, setIsCheckingLogin] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeTab, setActiveTab] = useState<Tab>("home");

  useEffect(() => {
    checkLoginStatus();
  }, []);

  const checkLoginStatus = async () => {
    try {
      const savedLoginStatus = await AsyncStorage.getItem(LOGIN_KEY);

      if (savedLoginStatus === "true") {
        setIsLoggedIn(true);
      }
    } catch (error) {
      console.log("Lỗi kiểm tra đăng nhập:", error);
    } finally {
      setIsCheckingLogin(false);
    }
  };

  const handleLogin = async () => {
    try {
      await AsyncStorage.setItem(LOGIN_KEY, "true");
      setIsLoggedIn(true);
      setActiveTab("home");
    } catch (error) {
      console.log("Lỗi lưu đăng nhập:", error);
    }
  };

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem(LOGIN_KEY);
      setIsLoggedIn(false);
      setActiveTab("home");
    } catch (error) {
      console.log("Lỗi đăng xuất:", error);
    }
  };

  if (isCheckingLogin) {
    return (
      <SafeAreaView style={styles.loadingSafe}>
        <ActivityIndicator size="large" color="#FF6A21" />
      </SafeAreaView>
    );
  }

  if (!isLoggedIn) {
    return <LoginScreen onLogin={handleLogin} />;
  }

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.phone}>
        <View style={styles.content}>
          {activeTab === "home" && (
            <HomeScreen onNavigate={(screen) => setActiveTab(screen)} />
          )}

          {activeTab === "invoice" && <InvoiceScreen />}

          {activeTab === "repair" && <RepairScreen />}

          {activeTab === "contract" && <ContractScreen />}

          {activeTab === "utility" && (
            <UtilityScreen onBack={() => setActiveTab("home")} />
          )}

          {activeTab === "profile" && (
            <ProfileScreen onBack={() => setActiveTab("account")} />
          )}

          {activeTab === "account" && (
            <AccountScreen
              onLogout={handleLogout}
              onNavigate={(screen) => setActiveTab(screen)}
            />
          )}
        </View>

        <BottomNav activeTab={activeTab} onChangeTab={setActiveTab} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  loadingSafe: {
    flex: 1,
    backgroundColor: "#F4F5F7",
    alignItems: "center",
    justifyContent: "center",
  },
  safe: {
    flex: 1,
    backgroundColor: "#F4F5F7",
  },
  phone: {
    flex: 1,
    width: "100%",
    maxWidth: 430,
    alignSelf: "center",
    backgroundColor: "#F4F5F7",
  },
  content: {
    flex: 1,
  },
});