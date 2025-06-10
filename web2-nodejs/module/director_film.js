import Director from './director.js';
import Film from './film.js';

Director.hasMany(Film, {
    foreignKey: {
        name: 'directorId',
        allowNull: true
    },
    onDelete: 'SET NULL'
});

Film.belongsTo(Director, {
    foreignKey: {
        name: 'directorId',
        allowNull: true
    }
});

export { Director, Film };