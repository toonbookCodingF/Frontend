import { StyleSheet } from "react-native";

const loginStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#800080",
    padding: 20,
  },
  title: {
    fontSize: 22,
    color: "white",
    fontWeight: "bold",
    marginBottom: 20,
  },
  input: {
    width: "100%",
    padding: 15,
    borderWidth: 2,
    borderColor: "#FF69B4",
    borderRadius: 25,
    backgroundColor: "transparent",
    color: "white",
    marginBottom: 15,
  },
  button: {
    backgroundColor: "#FF69B4",
    padding: 15,
    borderRadius: 25,
    width: "100%",
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
  linksContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginTop: 15,
  },
  linkText: {
    color: "white",
    fontSize: 14,
  },
  socialText: {
    color: "white",
    marginTop: 20,
  },
});

export default loginStyles;