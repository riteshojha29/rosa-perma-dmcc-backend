const db = require('_helpers/db');
const User = db.User;

module.exports = {
    register,
    login,
    logout,
    generateOTP, 
    verifyOTP,
    activateUser
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
        if(user.activated) {
            return user.toJSON()
        } else {
            await generateOTP(user);
            throw "User not verified"
        }
        
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
}

async function logout() {

}

async function generateOTP(user) {
    var createdDate = Math.floor(new Date().getTime() / 1000);
    console.log('created Date -> ', createdDate);
    console.log('validity -> ', createdDate + 1500);

    user.otp = parseInt(Math.random() * 1000000);
    user.save();
}

async function verifyOTP(data) {
    const { otp, email, mobile } = data;

    if (!otp) {
        throw "Please enter OTP received";
    }

    const user = await User.findOne({email: email, mobile: mobile})
    if (user) {
        if(user.otp != otp) {
            throw 'Invalid OTP entered';
        } else {
            activateUser(user);
        }
    } else {
        throw 'Invalid Mobile/Email entered';
    }
    
}

async function activateUser(user) {
    user.activated = true;
    user.otp = 000000;

    await user.save();
}
