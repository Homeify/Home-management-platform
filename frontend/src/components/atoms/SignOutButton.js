import React from 'react';
import { useTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { LogOutIcon } from '../../assets/icons';
import { signOut as signOutAction } from '../../state/actions/auth';
import ROUTES from '../../utils/routes';
import NavItem from './Navbar/NavItem';

function SignOutButton({ signOut }) {
    const { t } = useTranslation();
    const navigate = useNavigate();

    const signOutHandler = async (e) => {
        e.preventDefault();
        await signOut();
        setTimeout(navigate(ROUTES.LANDING), 100);
    };

    return (
        <NavItem
            icon={LogOutIcon}
            name={t('logout')}
            iconSize='14pt'
            onClick={signOutHandler}
        />
    );
}

const mapStateToProps = (state) => {
    return {};
};

const mapDispatchToProps = (dispatch) => {
    return {
        dispatch,
        signOut: () => dispatch(signOutAction()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(SignOutButton);
