using System;
using System.Linq;
using System.Linq.Expressions;

namespace Api.Database.Repositories
{
    public class BaseRepository<T> : IRepository<T> where T : class, new()
    {
        private readonly ApplicationDbContext _dbContext;

        public BaseRepository(ApplicationDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public virtual void Add(T entity)
        {
            _dbContext.Set<T>().Add(entity);
        }

        public T GetSingle(Expression<Func<T, bool>> predicate)
        {
            return _dbContext.Set<T>().FirstOrDefault(predicate);
        }

        public virtual void Commit()
        {
            _dbContext.SaveChanges();
        }
    }
}
