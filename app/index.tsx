import React, { useState } from "react";
import { View, StyleSheet, SafeAreaView } from "react-native";

import BottomNav from "../components/BottomNav";
import LoginScreen from "../screens/LoginScreen";
import HomeScreen from "../screens/HomeScreen";
import InvoiceScreen from "../screens/InvoiceScreen";
import RepairScreen from "../screens/RepairScreen";
import ContractScreen from "../screens/ContractScreen";
import AccountScreen from "../screens/AccountScreen";

type Tab = "home" | "invoice" | "repair" | "contract" | "account";

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeTab, setActiveTab] = useState<Tab>("home");

  if (!isLoggedIn) {
    return <LoginScreen onLogin={() => setIsLoggedIn(true)} />;
  }

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.phone}>
        <View style={styles.content}>
          {activeTab === "home" && <HomeScreen />}
          {activeTab === "invoice" && <InvoiceScreen />}
          {activeTab === "repair" && <RepairScreen />}
          {activeTab === "contract" && <ContractScreen />}
          {activeTab === "account" && (
            <AccountScreen onLogout={() => setIsLoggedIn(false)} />
          )}
        </View>

        <BottomNav activeTab={activeTab} onChangeTab={setActiveTab} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
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