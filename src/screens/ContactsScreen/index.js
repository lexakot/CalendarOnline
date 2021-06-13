import {useFocusEffect} from '@react-navigation/native';
import React from 'react';

import {PermissionsAndroid} from 'react-native';
import Contacts from 'react-native-contacts';

import SearchIcon from '../../assets/icons/search.svg';
import RightArrowIcon from '../../assets/icons/right-arrow.svg';
import UserPlusIcon from '../../assets/icons/user-plus.svg';

import TokenStorage from '../../services/storage/token';

import TopBar from '../../components/TopBar';

import * as S from './styled';
import axios from 'axios';

const Contact = ({contact}) => {
  return (
    <S.ContactContainer>
      <S.ContactAvatar source={{uri: contact.thumbnailPath}} />
      <S.ContactInfoContainer>
        <S.ContactNameContainer>
          <S.ContactLastname>{contact?.familyName} </S.ContactLastname>
          <S.ContactFirstname>{contact?.givenName}</S.ContactFirstname>
        </S.ContactNameContainer>
        <S.ContactNumber>{contact?.phoneNumbers[0].number}</S.ContactNumber>
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
  const [syncContacts, setSyncContacts] = React.useState([]);
  const [permissionsError, setPermissionsError] = React.useState(false);
  const [searchString, setSearchString] = React.useState('');

  const renderListOfContacts = () => {
    if (permissionsError) {
      return <S.ErrorText>Дайте разрешение приложению</S.ErrorText>;
    }

    const contactsToTabSelected = tabSelected === 1 ? contacts : syncContacts;
    const contactsToDisplay = contactsToTabSelected.filter(c =>
      c.displayName.toLowerCase().includes(searchString.toLowerCase()),
    );

    if (!contactsToDisplay.length && !permissionsError) {
      return <S.ErrorText>Нет доступных контактов</S.ErrorText>;
    }

    return (
      <S.ListContacts>
        {contactsToDisplay.map((contact, index) => (
          <Contact contact={contact} key={index} />
        ))}
      </S.ListContacts>
    );
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

          const formatted = res.map(c => ({
            ...c,
            formattedPhone: c.phoneNumbers[0].number
              .replace(/\s/g, '')
              .replaceAll('+', '')
              .replaceAll('-', ''),
          }));

          const phoneNumbers = formatted.map(c => c.formattedPhone);
          console.log(phoneNumbers);

          const token = await TokenStorage.get();
          const config = {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`,
            },
          };
          const {data} = await axios.post(
            'http://82.146.48.248:90/api/Contacts/get-contacts',
            phoneNumbers,
            config,
          );
          console.log('data', data);

          const findSyncContacts = formatted
            .map(c => {
              const f = data.find(t => t.PhoneNumber === c.formattedPhone);
              if (f.IsExisted) {
                return c;
              }
            })
            .filter(k => k !== undefined);
          console.log('findSyncContacts', findSyncContacts);
          setSyncContacts(findSyncContacts);
          setContacts(formatted);
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
      {renderListOfContacts()}
    </S.Container>
  );
};

export default ContactsScreen;
