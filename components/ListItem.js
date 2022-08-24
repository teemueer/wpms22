import {useState} from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Image,
  Text,
  Modal,
} from 'react-native';
import PropTypes from 'prop-types';
import {baseUrl} from './List';

const ListItem = (props) => {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <>
      <Modal
        animationType="slide"
        transparent={false}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View>
          <Image
            style={styles.image}
            source={{uri: `${baseUrl}/uploads/${props.singleMedia.filename}`}}
          />
        </View>
      </Modal>

      <TouchableOpacity
        style={styles.cat}
        onPress={() => setModalVisible(!modalVisible)}
      >
        <Image
          style={styles.thumbnail}
          source={{
            uri: `${baseUrl}/uploads/${props.singleMedia.thumbnails.w160}`,
          }}
        />
        <View style={styles.info}>
          <Text style={styles.title}>{props.singleMedia.title}</Text>
          <Text style={styles.description}>
            {props.singleMedia.description}
          </Text>
        </View>
      </TouchableOpacity>
    </>
  );
};

const styles = StyleSheet.create({
  cat: {
    flex: 1,
    flexWrap: 'nowrap',
    flexDirection: 'row',
    backgroundColor: '#ccc',
    marginBottom: 5,
    padding: 10,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  thumbnail: {
    width: 150,
    height: 200,
    marginRight: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  info: {
    flexShrink: 1,
  },
});

ListItem.propTypes = {
  singleMedia: PropTypes.object,
};

export default ListItem;
