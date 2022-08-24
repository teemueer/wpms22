import {FlatList} from 'react-native';
import ListItem from './ListItem';
import {useState, useEffect} from 'react';

const url =
  'https://raw.githubusercontent.com/mattpe/wbma/master/docs/assets/test.json';

const loadMedia = async () => {
  const res = await fetch(url);
  const json = await res.json();
  return json;
};

const List = () => {
  const [mediaArray, setMediaArray] = useState([]);

  useEffect(() => {
    try {
      loadMedia().then((json) => {
        setMediaArray(json);
      });
    } catch (error) {
      console.error(error);
    }
  }, []);

  return (
    <FlatList
      data={mediaArray}
      keyExtractor={(item, index) => index.toString()}
      renderItem={({item}) => <ListItem singleMedia={item} />}
    />
  );
};

export default List;
