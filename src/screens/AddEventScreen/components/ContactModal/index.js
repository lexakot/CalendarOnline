import React from 'react';
import {PermissionsAndroid} from 'react-native';
import Contacts from 'react-native-contacts';

import SearchIcon from '../../../../assets/icons/search.svg';
import CheckIcon from '../../../../assets/icons/check-mark.svg';
import BottomModal from '../../../../components/BottomModal';

import * as S from './styled';

const Contact = ({contact, onContactPress, selectedContacts}) => {
  console.log('selectedContacts', selectedContacts);
  return (
    <S.ContactContainer onPress={onContactPress}>
      <S.ContactAvatar source={{uri: contact.thumbnailPath}} />
      <S.ContactInfoContainer>
        <S.ContactNameContainer>
          <S.ContactLastname>{contact?.familyName} </S.ContactLastname>
          <S.ContactFirstname>{contact?.givenName}</S.ContactFirstname>
        </S.ContactNameContainer>
        <S.ContactNumber>{contact?.phoneNumbers[0].number}</S.ContactNumber>
      </S.ContactInfoContainer>
      <S.BookingButton
        isChecked={selectedContacts.find(c => c.displayName === contact.displayName)}>
        <CheckIcon />
      </S.BookingButton>
    </S.ContactContainer>
  );
};

const ContactModal = ({visible, close, selectedContacts, setSelectedContacts}) => {
  const [tabSelected, setTabSelected] = React.useState(0);
  const [searchString, setSearchString] = React.useState('');
  const [contacts, setContacts] = React.useState([]);
  const [permissionsError, setPermissionsError] = React.useState(false);
  // const [selectedContacts, setSelectedContacts] = React.useState([]);

  const addContact = contact => {
    setSelectedContacts([...selectedContacts, contact]);
  };

  React.useEffect(() => {
    async function getContacts() {
      const request = await PermissionsAndroid.requestMultiple([
        PermissionsAndroid.PERMISSIONS.READ_CONTACTS,
        PermissionsAndroid.PERMISSIONS.WRITE_CONTACTS,
      ]);

      if (request['android.permission.READ_CONTACTS'] === 'granted') {
        try {
          const res = await Contacts.getAll();
          setContacts(res);
          console.log(res);
        } catch (err) {
          alert(err);
        }
      } else {
        setPermissionsError(true);
      }
    }
    getContacts();
  }, [JSON.stringify(contacts)]);

  return (
    <BottomModal
      visible={visible}
      title="Пригласить"
      height={500}
      close={close}>
      <S.Container>
        <S.TabsContainer>
          <S.Tab
            onPress={() => setTabSelected(0)}
            isSelected={tabSelected === 0}>
            <S.TabText isSelected={tabSelected === 0}>Календарь</S.TabText>
          </S.Tab>
          <S.Tab
            onPress={() => setTabSelected(1)}
            isSelected={tabSelected === 1}>
            <S.TabText isSelected={tabSelected === 1}>Все</S.TabText>
          </S.Tab>
        </S.TabsContainer>
        <S.SearchInputContainer>
          <S.SearchIconContainer>
            <SearchIcon />
          </S.SearchIconContainer>
          <S.SearchInput
            onChangeText={text => setSearchString(text)}
            value={searchString}
            placeholder="Поиск"
          />
        </S.SearchInputContainer>
        {contacts.length ? (
          <S.ListContacts>
            {contacts.map((contact, index) => (
              <Contact
                onContactPress={() => addContact(contact)}
                selectedContacts={selectedContacts}
                contact={contact}
                key={index}
              />
            ))}
          </S.ListContacts>
        ) : null}
      </S.Container>
    </BottomModal>
  );
};

export default ContactModal;
