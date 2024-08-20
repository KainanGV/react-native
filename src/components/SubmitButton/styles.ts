import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  button: {
    width: 380, // Largura fixa
    height: 44,
    backgroundColor: "#D0005E",
    borderRadius: 500,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 16,
    alignSelf: "center", // Centraliza o botão
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export { styles };
