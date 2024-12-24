import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import { IMAGE28 } from "../res/drawables";
const EditableField = ({ label, value }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [text, setText] = useState(value);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    setIsEditing(false);
  };

  return (
    <View style={styles.card}>
      <View style={styles.textContainer}>
        <Text style={styles.label}>{label}</Text>
        {isEditing ? (
          <TextInput
            style={styles.input}
            value={text}
            onChangeText={setText}
            autoFocus
          />
        ) : (
          <Text style={styles.value}>{text}</Text>
        )}
      </View>
      <TouchableOpacity onPress={isEditing ? handleSave : handleEdit}>
        <Image source={IMAGE28} style={styles.icon} />
      </TouchableOpacity>
    </View>
  );
};

const TextInputProfile = () => {
  return (
    <ScrollView
      style={styles.scrollContainer}
      contentContainerStyle={styles.scrollContent}
    >
      <EditableField label="Full Name" value="ZainZaka" />
      <EditableField label="Email" value="xainzaka@gmail.com" />
      <EditableField label="Password" value="12345678" />
      <EditableField label="PhoneNo" value="12345678" />
      <EditableField label="Address" value="12345678" />
      <EditableField label="DebitCardDetail" value="12345678" />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    backgroundColor: GRAY_COLOR,
    width: "100%",
    marginTop: 20,
    padding: 16,
    marginBottom: 70,
  },
  scrollContent: {
    padding: 2,
  },
  card: {
    backgroundColor: WHITE_COLOR,
    padding: 16,
    borderRadius: 8,
    marginBottom: 28,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",  },
  label: {
    color: GRAY_COLOR,

    fontSize: 12,
    marginBottom: 4,
  },
  value: {
    color: THEME_TEXT_COLOR,

    fontSize: 16,
    fontWeight: "600",
  },
  input: {
    borderBottomWidth: 1,
    borderColor: GRAY_COLOR,
    color: THEME_TEXT_COLOR,
    paddingVertical: 4,
  },
  icon: {
    width: 30,
    height: 30,
    tintColor: THEME_COLOR,

  },
});

export default TextInputProfile;
