/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import {connect} from 'react-redux';

import {FlatList} from 'react-native';

import {getContactsRequest} from '../../redux/contacts';

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
        <S.ContactNumber>{contact?.phoneNumbers[0].number}</S.ContactNumber>
      </S.ContactInfoContainer>
      <S.BookingButton>
        <S.BookingText>Запись</S.BookingText>
        <RightArrowIcon />
      </S.BookingButton>
    </S.ContactContainer>
  );
};
const ContactsScreen = props => {
  const [tabSelected, setTabSelected] = React.useState(0);

  const [searchString, setSearchString] = React.useState('');

  const {contacts, syncContacts, permissionsError} = props;

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
      <FlatList
        data={contactsToDisplay}
        renderItem={({item, index}) => <Contact contact={item} key={index} />}
        contentContainerStyle={{
          paddingHorizontal: 20,
        }}
      />
    );
  };

  React.useEffect(() => {
    props.getContactsRequest();
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

const mapStateToProps = ({contacts}) => ({
  contacts: contacts.contacts,
  syncContacts: contacts.syncContacts,
  permissionsError: contacts.permissionsError,
});

const mapDispatchToProps = {
  getContactsRequest,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ContactsScreen);
