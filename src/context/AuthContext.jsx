import { createContext, useState, useEffect, useContext } from 'react';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const storedUser = localStorage.getItem('currentUser');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
        setLoading(false);
    }, []);

    const login = (email, password) => {
        const users = JSON.parse(localStorage.getItem('users') || '[]');
        const foundUser = users.find(u => u.email === email && u.password === password);

        if (foundUser) {
            // Don't store password in current user session
            const { password, ...userWithoutPassword } = foundUser;
            localStorage.setItem('currentUser', JSON.stringify(userWithoutPassword));
            setUser(userWithoutPassword);
            return { success: true };
        }
        return { success: false, message: 'Invalid email or password' };
    };

    const register = (name, email, password) => {
        const users = JSON.parse(localStorage.getItem('users') || '[]');
        const existingUser = users.find(u => u.email === email);

        if (existingUser) {
            return { success: false, message: 'User already exists' };
        }

        const newUser = { id: Date.now().toString(), name, email, password };
        users.push(newUser);
        localStorage.setItem('users', JSON.stringify(users));

        // Auto login after register
        const { password: _, ...userWithoutPassword } = newUser;
        localStorage.setItem('currentUser', JSON.stringify(userWithoutPassword));
        setUser(userWithoutPassword);

        return { success: true };
    };

    const logout = () => {
        localStorage.removeItem('currentUser');
        setUser(null);
    };

    const value = {
        user,
        login,
        register,
        logout,
        loading
    };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
};
