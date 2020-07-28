using System;
using System.Linq.Expressions;

namespace Api.Database.Repositories
{
    public interface IRepository<T> where T : class, new()
    {
        void Add(T entity);

        T GetSingle(Expression<Func<T, bool>> predicate);

        void Commit();

        void Delete(T entity);
    }
}
