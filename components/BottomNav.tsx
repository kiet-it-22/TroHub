import React from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "../constants/theme";

type Tab = "home" | "invoice" | "repair" | "contract" | "account";

type Props = {
  activeTab: Tab;
  onChangeTab: (tab: Tab) => void;
};

type IconName = React.ComponentProps<typeof Ionicons>["name"];

const tabs: {
  key: Tab;
  label: string;
  icon: IconName;
  activeIcon: IconName;
}[] = [
  {
    key: "home",
    label: "Trang chủ",
    icon: "home-outline",
    activeIcon: "home",
  },
  {
    key: "invoice",
    label: "Hóa đơn",
    icon: "receipt-outline",
    activeIcon: "receipt",
  },
  {
    key: "repair",
    label: "Sửa chữa",
    icon: "construct-outline",
    activeIcon: "construct",
  },
  {
    key: "contract",
    label: "Hợp đồng",
    icon: "document-text-outline",
    activeIcon: "document-text",
  },
  {
    key: "account",
    label: "Tài khoản",
    icon: "person-outline",
    activeIcon: "person",
  },
];

export default function BottomNav({ activeTab, onChangeTab }: Props) {
  return (
    <View style={styles.wrapper}>
      <View style={styles.container}>
        {tabs.map((tab) => {
          const active = activeTab === tab.key;

          return (
            <Pressable
              key={tab.key}
              style={styles.item}
              onPress={() => onChangeTab(tab.key)}
            >
              <View style={[styles.iconBox, active && styles.iconBoxActive]}>
                <Ionicons
                  name={active ? tab.activeIcon : tab.icon}
                  size={21}
                  color={active ? COLORS.orange : COLORS.muted}
                />
              </View>

              <Text style={[styles.label, active && styles.activeLabel]}>
                {tab.label}
              </Text>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: "#F4F5F7",
    paddingHorizontal: 14,
    paddingBottom: 10,
    paddingTop: 6,
  },
  container: {
    height: 68,
    backgroundColor: "#FFFFFF",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    borderRadius: 22,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowRadius: 20,
    elevation: 8,
  },
  item: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  iconBox: {
    width: 34,
    height: 28,
    borderRadius: 999,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 3,
  },
  iconBoxActive: {
    backgroundColor: COLORS.orangeSoft,
  },
  label: {
    fontSize: 10,
    color: COLORS.muted,
    fontWeight: "700",
  },
  activeLabel: {
    color: COLORS.orange,
    fontWeight: "900",
  },
});