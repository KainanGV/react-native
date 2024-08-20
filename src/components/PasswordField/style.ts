import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    marginBottom: 24,
  },
  inputPassword: {
    flex: 1,
    height: 44,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: "#A0A0A0",
    borderRadius: 8,
  },
  eyeIcon: {
    position: "absolute",
    right: 16,
  },
});

export { styles };
