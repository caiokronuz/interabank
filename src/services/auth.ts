import jwt from 'jsonwebtoken';

const secret = '6664bcc5ebcb271e349f5672f14c5d5f'

export const generateToken = (user: { login: string, name: string }) => {
    try{
        const token = jwt.sign({ login: user.login, name: user.name }, secret , { expiresIn: '1h' });
        console.log("deu certo!")
        return token;
    }catch(err){
        console.log(err)
    }
};