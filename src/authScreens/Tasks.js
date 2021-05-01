import React, {useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import SelectOptions from '../components/SelectOptions';
import {globalStyles, globalColors} from '../styles/styles';

export default function Tasks({tasks}) {
  const [selectedOption, setSelectedOption] = useState('Today');

  const setSelection = id => {
    setSelectedOption(id);

    // switch (id) {
    //   case "all":
    //     return setDisplayBlogs(allBlogs);
    //   case "public":
    //     return setDisplayBlogs(
    //       allBlogs.filter((blog) => blog.status === "Public")
    //     );
    //   case "private":
    //     return setDisplayBlogs(
    //       allBlogs.filter((blog) => blog.status === "Private")
    //     );
    //   case "saved":
    //   default:
    //     return setDisplayBlogs(savedBlogs);
    // }
  };

  return (
    <View style={globalStyles.component}>
      <SelectOptions
        selectedOption={selectedOption}
        selectOptions={setSelection}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
