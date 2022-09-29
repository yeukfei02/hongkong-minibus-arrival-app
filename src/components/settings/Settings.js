import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Card } from "react-native-paper";
import DropDownPicker from "react-native-dropdown-picker";
import { useTranslation } from "react-i18next";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingVertical: 15,
  },
  changeLanguageContainer: {
    padding: 20,
    backgroundColor: "white",
    marginHorizontal: 30,
    marginVertical: 15,
  },
  changeLanguageTitleStyle: {
    fontSize: 18,
    marginBottom: 10,
  },
});

function Settings() {
  const { t, i18n } = useTranslation();

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("繁體中文");
  const [items, setItems] = useState([
    {
      label: t("selectLanguage"),
      value: t("selectLanguage"),
    },
    {
      label: "英文",
      value: "英文",
    },
    {
      label: "繁體中文",
      value: "繁體中文",
    },
    {
      label: "簡體中文",
      value: "簡體中文",
    },
  ]);

  const onChangeValue = (value) => {
    if (value) {
      switch (value) {
        case "English" || "英文" || "英语":
          i18n.changeLanguage("eng");
          break;
        case "Traditional Chinese" || "繁體中文" || "繁体中文":
          i18n.changeLanguage("zh_hk");
          break;
        case "Simplified Chinese" || "簡體中文" || "简体中文":
          i18n.changeLanguage("zh_cn");
          break;
        default:
      }
    }
  };

  const renderSelectDropdown = () => {
    const selectDropdown = (
      <View>
        <DropDownPicker
          open={open}
          value={value}
          items={items}
          setOpen={setOpen}
          setValue={setValue}
          setItems={setItems}
          onChangeValue={onChangeValue}
        />
      </View>
    );

    return selectDropdown;
  };

  return (
    <View style={styles.container}>
      <Card style={styles.changeLanguageContainer}>
        <Text style={styles.changeLanguageTitleStyle}>
          {t("changeLanguage")}
        </Text>
        {renderSelectDropdown()}
      </Card>
    </View>
  );
}

export default Settings;
