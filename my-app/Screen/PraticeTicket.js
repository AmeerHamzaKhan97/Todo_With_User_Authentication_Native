import React, { useEffect, useState } from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import { Domain } from "../Domain";

function PraticeTicket() {
  const id = "1233456667";
  const [ticketData, setTicketData] = useState([]);

  useEffect(() => {
    function fetchAllTicket() {
      fetch(`${Domain}/api/v1/getticket/${id}`, {
        method: "GET",
      })
        .then((res) => res.json())
        .then((respo) => {
          setTicketData(respo);
          //   console.log(respo);
        });
    }
    fetchAllTicket();
  }, []);

  return (
    <View>
      {ticketData.map((v, idx) => {
        return (
          <View key={idx} style={styles.ticket}>
            <Text style={styles.text}>{v.query}</Text>
          </View>
        );
      })}
      <Text>Ticket</Text>
    </View>
  );
}

export default PraticeTicket;

const styles = StyleSheet.create({
  ticket: {
    marginHorizontal: 10,
    marginVertical: 10,
  },
  text: {
    textAlign: "center",
    fontSize: 25,
    fontWeight: "500",
  },
});
