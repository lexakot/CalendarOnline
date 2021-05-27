import {useFocusEffect} from '@react-navigation/native';
import React from 'react';

import {PermissionsAndroid} from 'react-native';
import Contacts from 'react-native-contacts';

import SearchIcon from '../../assets/icons/search.svg';
import RightArrowIcon from '../../assets/icons/right-arrow.svg';
import UserPlusIcon from '../../assets/icons/user-plus.svg';

import TopBar from '../../components/TopBar';

import * as S from './styled';

const Contact = ({contact}) => {
  return (
    <S.ContactContainer>
      <S.ContactAvatar source={{uri: contact.thumbnailPath}} />
      <S.ContactInfoContainer>
        <S.ContactNameContainer>
          <S.ContactLastname>{contact?.familyName} </S.ContactLastname>
          <S.ContactFirstname>{contact?.givenName}</S.ContactFirstname>
        </S.ContactNameContainer>
        {/* <S.ContactNumber>{contact?.phoneNumbers[0].number}</S.ContactNumber> */}
      </S.ContactInfoContainer>
      <S.BookingButton>
        <S.BookingText>Запись</S.BookingText>
        <RightArrowIcon />
      </S.BookingButton>
    </S.ContactContainer>
  );
};
const ContactsScreen = () => {
  const [tabSelected, setTabSelected] = React.useState(0);
  const [contacts, setContacts] = React.useState([]);
  const [permissionsError, setPermissionsError] = React.useState(false);
  const [searchString, setSearchString] = React.useState('');

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
          alert(JSON.stringify(res[0].phoneNumbers));
        } catch (err) {
          alert(err);
        }
      } else {
        setPermissionsError(true);
      }
    }
    getContacts();
  }, [JSON.stringify(contacts)]);

  const filterBySearchString = () => {
    if (!contacts.length) {
      return [];
    }
    return contacts;
    // return contacts.filter(c =>
    //   c.displayName.toLowerCase().includes(searchString.toLowerCase()),
    // );
  };
  return (
    <S.Container>
      <TopBar
        withRightButton
        renderRightButton={() => <UserPlusIcon />}
        title="Контакты"
      />
      <S.TabsContainer>
        <S.Tab onPress={() => setTabSelected(0)} isSelected={tabSelected === 0}>
          <S.TabText isSelected={tabSelected === 0}>Календарь</S.TabText>
        </S.Tab>
        <S.Tab onPress={() => setTabSelected(1)} isSelected={tabSelected === 1}>
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
      {permissionsError && (
        <S.ErrorText>Дайте разрешение приложению</S.ErrorText>
      )}
      {!permissionsError && !filterBySearchString().length && (
        <S.ErrorText>Нет доступных контактов</S.ErrorText>
      )}
      {contacts.length ? (
        <S.ListContacts>
          {contacts.map((contact, index) => (
            <Contact contact={contact} key={index} />
          ))}
        </S.ListContacts>
      ) : null}
    </S.Container>
  );
};

export default ContactsScreen;
