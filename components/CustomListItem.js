import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import { ListItem, Avatar } from "react-native-elements";
import { db } from "../firebase";

const CustomListItem = ({ id, chatName, enterChat }) => {
  const [chatMessages, setChatMessages] = useState([]);

  useEffect(() => {
    const unsubscribe = db
      .collection("chats")
      .doc(id)
      .collection("message")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) =>
        setChatMessages(snapshot.docs.map((doc) => doc.data()))
      );

    return unsubscribe;
  });
  return (
    <ListItem key={id} bottomDivider onPress={() => enterChat(id, chatName)}>
      <Avatar
        rounded
        source={{
          uri:
            chatMessages?.[0]?.photoURL ||
            "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHkAAAB5CAMAAAAqJH57AAAAM1BMVEWVu9////+QuN6Mtt35+/2avuDe6fTU4vHw9fr1+PynxuTk7favy+agwuK30OjN3u/C1+zv6qIoAAADRklEQVRoge2b65KkIAyFIVxFQd//aRe1715I7NBu1Ximan5sbdfXMYSEwyjEpUuX/rZAKRFDl3+iUAp+hoUw2EbLWbqxQ4BfwJXpvfyU742qzAXh9II7he5E1bghrXMndqqIVm6TO8pVe+Kq3QVL2VZCF8G10KovgqXsK6AhIMBSBv5lBssqXpNnJ0NCgaVkry1kyPxBQ4cES9nxopVFk5kryzRocmNYybiSmhU4wTAQyANnoglpltJyJlpha2qUZyXjF1heYqxlRSJzgs32KLKU5iyrv0g+L89w2to+sZ7Lw99TrM0K9gftdznOp31exxD4kSQPJZxgEfEFrSMrWeAXt+cFExo0a3smjNv8A3dEk5nTjE80c5oJewnrPjIJO/eyzryTTjtLCsAc3PPRvYJNAyhyDX8IFTT/+pqEIFfhYoKukeUJXWpYupYLWDQOmO2CFxUssRpm2AO91yyZ2+OHYBttK7vrm52jUiXP0Pn3+hh6GzirbGHmVqwqLsf+Ns45ht5wG3EQ3bMPqfCebRtua2vsZy7yXaeAUmkO09+fpoKut15r7W3fwZ1r5kbaJp6LJAXpJcLuUTn5+0x6MNTLPmMTfFlioLqPMtq6ogHxseht903gKi0HET2ssEEMyz3dd8fjXt82mj6Kl3jycw39+sneHgVvT17epTi7ISYmt/P/DnGhdFpvvPclF6M9kOvCrRhWB27PKL7ynsjzN8kZ2RPZNeEKmRw0U5ZHETNdHPbwoo2FhIN6WaSjPMn/Kok0rSi+h50fNyXRhhEsJcF1Zk0zKdHIszJWhNNWsVnQRGgbihUsJX6J4ewBvPAxU5xdjNDuL8nNxgjteLPuYKPQuxjz0qYsbsodEUb4GyxmMN4ywjvKWCGdZ8JfcGCFtG7YiwpdVsz9YhSyZ+y4MEeFdG9OJHNvJPithHLlixP2THmRf0g+cW3znSPvwv5FJATeNtkQHPeFDfaFqMbYu/V3HHvEDARQ3Y7hVJZ3OdqDPiDkDyZ3ZDNtXZo+/Y3y500YrMeea7W3QzDfUp/48VWEjG/2+LoZoW/OJJPmVyHS4Nr8DZ5fQWdi64ZU/QUJmIxtMDFM72OEaOZ/+NlLGZcuXfr/9A9ytCPa4535zAAAAABJRU5ErkJggg==",
        }}
      />
      <ListItem.Content>
        <ListItem.Title style={{ fontWeight: "800" }}>
          {chatName}
        </ListItem.Title>
        <ListItem.Subtitle numberOfLines={1} ellipsizeMode="tail">
          {chatMessages?.[0]?.displayName}:{chatMessages?.[0]?.message}
        </ListItem.Subtitle>
      </ListItem.Content>
    </ListItem>
  );
};

export default CustomListItem;
