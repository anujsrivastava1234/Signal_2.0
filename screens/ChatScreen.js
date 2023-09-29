import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TextInput,
  Keyboard,
} from "react-native";
import React, { useLayoutEffect, useState } from "react";
import { Avatar, Icon } from "react-native-elements";
import { AntDesign, FontAwesome, Ionicons } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";
import { TouchableWithoutFeedback } from "react-native";
import { db, auth } from "../firebase";
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";

const ChatScreen = ({ navigation, route }) => {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  useLayoutEffect(() => {
    navigation.setOptions({
      title: "Chats",
      headerBackTitleVisible: false,
      headerTitleAlign: "left",
      headerTitle: () => (
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            ellipsizeMode: "tail",
          }}
        >
          <Avatar
            rounded
            source={{
              uri:
                messages[0]?.data.photoURL ||
                "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHkAAAB5CAMAAAAqJH57AAAAM1BMVEWVu9////+QuN6Mtt35+/2avuDe6fTU4vHw9fr1+PynxuTk7favy+agwuK30OjN3u/C1+zv6qIoAAADRklEQVRoge2b65KkIAyFIVxFQd//aRe1715I7NBu1Ximan5sbdfXMYSEwyjEpUuX/rZAKRFDl3+iUAp+hoUw2EbLWbqxQ4BfwJXpvfyU742qzAXh9II7he5E1bghrXMndqqIVm6TO8pVe+Kq3QVL2VZCF8G10KovgqXsK6AhIMBSBv5lBssqXpNnJ0NCgaVkry1kyPxBQ4cES9nxopVFk5kryzRocmNYybiSmhU4wTAQyANnoglpltJyJlpha2qUZyXjF1heYqxlRSJzgs32KLKU5iyrv0g+L89w2to+sZ7Lw99TrM0K9gftdznOp31exxD4kSQPJZxgEfEFrSMrWeAXt+cFExo0a3smjNv8A3dEk5nTjE80c5oJewnrPjIJO/eyzryTTjtLCsAc3PPRvYJNAyhyDX8IFTT/+pqEIFfhYoKukeUJXWpYupYLWDQOmO2CFxUssRpm2AO91yyZ2+OHYBttK7vrm52jUiXP0Pn3+hh6GzirbGHmVqwqLsf+Ns45ht5wG3EQ3bMPqfCebRtua2vsZy7yXaeAUmkO09+fpoKut15r7W3fwZ1r5kbaJp6LJAXpJcLuUTn5+0x6MNTLPmMTfFlioLqPMtq6ogHxseht903gKi0HET2ssEEMyz3dd8fjXt82mj6Kl3jycw39+sneHgVvT17epTi7ISYmt/P/DnGhdFpvvPclF6M9kOvCrRhWB27PKL7ynsjzN8kZ2RPZNeEKmRw0U5ZHETNdHPbwoo2FhIN6WaSjPMn/Kok0rSi+h50fNyXRhhEsJcF1Zk0zKdHIszJWhNNWsVnQRGgbihUsJX6J4ewBvPAxU5xdjNDuL8nNxgjteLPuYKPQuxjz0qYsbsodEUb4GyxmMN4ywjvKWCGdZ8JfcGCFtG7YiwpdVsz9YhSyZ+y4MEeFdG9OJHNvJPithHLlixP2THmRf0g+cW3znSPvwv5FJATeNtkQHPeFDfaFqMbYu/V3HHvEDARQ3Y7hVJZ3OdqDPiDkDyZ3ZDNtXZo+/Y3y500YrMeea7W3QzDfUp/48VWEjG/2+LoZoW/OJJPmVyHS4Nr8DZ5fQWdi64ZU/QUJmIxtMDFM72OEaOZ/+NlLGZcuXfr/9A9ytCPa4535zAAAAABJRU5ErkJggg==",
            }}
          />
          <Text
            style={{
              color: "white",
              marginLeft: 10,
              fontWeight: "700",
              fontSize: 20,
            }}
            numberOfLines={2}
            ellipsizeMode="tail"
          >
            {route.params.chatName}
          </Text>
        </View>
      ),

      headerRight: () => (
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            width: 80,
            marginRight: 10,
          }}
        >
          <TouchableOpacity>
            {/* <AntDesign name="videocamera" size={24} color="white" /> */}
            <FontAwesome name="video-camera" size={24} color="white" />
          </TouchableOpacity>
          <TouchableOpacity>
            <Ionicons name="call" size={24} color="white" />
          </TouchableOpacity>
        </View>
      ),
    });
  }, [navigation]);

  const sendMessage = () => {
    Keyboard.dismiss();
    db.collection("chats").doc(route.params.id).collection("message").add({
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      message: input,
      displayName: auth.currentUser.displayName,
      email: auth.currentUser.email,
      photoURL: auth.currentUser.photoURL,
    });
    setInput("");
  };

  useLayoutEffect(() => {
    const unsubscribe = db
      .collection("chats")
      .doc(route.params.id)
      .collection("message")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) =>
        setMessages(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            data: doc.data(),
          }))
        )
      );
    return unsubscribe;
  }, [route]);
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <StatusBar style="light" />
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}
        keyboardVerticalOffset={90}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <>
            <ScrollView contentContainerStyle={{ paddingTop: 15 }}>
              {messages.map(({ id, data }) =>
                data.email === auth.currentUser.email ? (
                  <View key={id} style={styles.reciever}>
                    <Avatar
                      position="absolute"
                      rounded
                      containerStyle={{
                        position: "absolute",
                        bottom: -15,
                        right: -5,
                      }}
                      size={30}
                      bottom={-15}
                      right={-5}
                      source={{ uri: data.photoURL }}
                    />
                    <Text style={styles.recieverText}>{data.message}</Text>
                  </View>
                ) : (
                  <View key={id} style={styles.sender}>
                    <Avatar
                      position="absolute"
                      rounded
                      containerStyle={{
                        position: "absolute",
                        bottom: -15,
                        right: -5,
                      }}
                      size={30}
                      bottom={-15}
                      right={-5}
                      source={{ uri: data.photoURL }}
                    />
                    <Text style={styles.senderText}>{data.message}</Text>
                    <Text style={styles.senderText}>{data.displayName}</Text>
                  </View>
                )
              )}
            </ScrollView>
            <View>
              {/* Footer */}
              <View style={styles.footer}>
                <TextInput
                  value={input}
                  onSubmitEditing={sendMessage}
                  placeholder="Signal Message"
                  style={styles.TextInput}
                  onChangeText={(text) => setInput(text)}
                />
                <TouchableOpacity activeOpacity={0.5} onPress={sendMessage}>
                  <Ionicons name="send" size={24} color="#2B68E6" />
                </TouchableOpacity>
              </View>
            </View>
          </>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default ChatScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  reciever: {
    padding: 15,
    backgroundColor: "#ECECEC",
    alignSelf: "flex-end",
    borderRadius: 20,
    marginRight: 15,
    marginBottom: 20,
    maxWidth: "80%",
    position: "relative",
  },
  sender: {
    padding: 15,
    backgroundColor: "#2B68E6",
    alignSelf: "flex-start",
    borderRadius: 20,
    margin: 15,
    maxWidth: "80%",
    position: "relative",
  },
  senderText: {
    color: "white",
    fontWeight: "500",
    marginLeft: 10,
    marginBottom: 15,
  },
  recieverText: {
    color: "black",
    fontWeight: "500",
    marginLeft: 10,
  },
  footer: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    padding: 15,
  },
  TextInput: {
    bottom: 0,
    height: 40,
    flex: 1,
    marginRight: 15,
    borderColor: "transparent",
    backgroundColor: "#ECECEC",
    borderRadius: 30,
    padding: 10,
    color: "grey",
  },
});
