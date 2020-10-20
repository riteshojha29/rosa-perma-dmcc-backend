const { ObjectID } = require('mongodb');
const db = require('_helpers/db');
const mailer = require('_helpers/sendMail')
const User = db.User;

module.exports = {
    register,
    login,
    logout,
    generateOTP, 
    verifyOTP,
    activateUser,
    getUserById
};

async function login(data) {
    const { email, mobile } = data;

    if (!email) {
        throw "Please enter email";
    }

    if (!mobile) {
        throw "Please enter mobile";
    }

    const user = await User.findOne({email: email, mobile: mobile})
    if (user) {
        if(!user.activated) {
            await generateOTP(user);
        } 
        return user.toJSON()
    } else {
        throw 'Invalid Mobile/Email entered';
    }
}

async function register(data) {
    const { username, email, mobile } = data;
    // validate
    if (await User.findOne({email: email})) {
        throw 'Email is already taken, Please try login';
    }

    if (await User.findOne({mobile: mobile})) {
        throw 'Mobile number is already taken, Please try login';
    }
    
    if (!username) {
        throw "Please enter name";
    }

    if (!email) {
        throw "Please enter email";
    }

    if (!mobile) {
        throw "Please enter mobile number";
    }

    if (mobile.length < 13) {
        throw "Please enter valid mobile number";
    }
    
    data.activated = false;
    const user = new User(data);

    // save user
    await user.save();

    await generateOTP(user);

    return user.toJSON()
}

async function logout() {

}

async function generateOTP(user) {
    user.otp = parseInt(Math.random() * 1000000);
    user.save();

    mailer.sendOTP(user.email, user.otp);
}

async function verifyOTP(data) {
    const { otp, id } = data;

    if (!otp) {
        throw "Please enter OTP received";
    }

    const user = await User.findOne({_id: id})
    if (user) {
        if(user.otp != otp) {
            throw 'Invalid OTP entered';
        } else {
            activateUser(user);
        }
    } else {
        throw 'User not found';
    }
    
}

async function activateUser(user) {
    user.activated = true;
    user.otp = 000000;

    await user.save();
}

async function getUserById(id) {
    return await User.findById(ObjectID(id));
}
