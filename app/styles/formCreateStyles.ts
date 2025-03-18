import { StyleSheet } from "react-native";

const formCreateStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#800080",
    padding: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 15,
    color: "white",
  },
  label: {
    fontSize: 18,
    marginBottom: 8,
    color: "white",
  },
  labelCover: {
    fontSize: 18,
    marginBottom: 0,
    color: "white",
  },
  input: {
    width: "80%",
    height: 40,
    borderWidth: 2,
    borderColor: "#FF69B4",
    borderRadius: 10,
    paddingHorizontal: 10,
    backgroundColor: "white",
    marginBottom: 30,
  },
  descriptionInput: {
    width: "80%",
    height: 200,
    borderWidth: 2,
    borderColor: "#FF69B4",
    borderRadius: 10,
    paddingHorizontal: 20,
    backgroundColor: "white",
    textAlignVertical: "top",
    marginBottom: 30,
  },
  buttonUpload: {
    textAlign: "center",
    backgroundColor: "#FF69B4",
    padding: 15,
    borderRadius: 25,
    width: "30%",
    alignItems: "center",
    marginTop: 10,
  },
  buttonSave: {
    textAlign: "center",
    backgroundColor: "#FF69B4",
    padding: 15,
    borderRadius: 25,
    width: "40%",
    alignItems: "center",
    marginTop: 10,
  },
});

export default formCreateStyles;
