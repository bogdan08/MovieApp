import React, {useState} from "react";
import { StyleSheet, View, Modal, ActivityIndicator } from "react-native";

const Loader = ({loading}) =>{
    return (
      <Modal transparent animationType={"none"} visible={loading} onRequestClose={() => null}>
        <View style={[styles.modalBackground, { backgroundColor: `rgba(0,0,0,0.4)` }]}>
          <View style={styles.activityIndicatorWrapper}>
            <ActivityIndicator />
          </View>
        </View>
      </Modal>
    )
}

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  activityIndicatorWrapper: {
    backgroundColor: "white",
    height: 100,
    width: 100,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center"
  }
});

export default Loader;
