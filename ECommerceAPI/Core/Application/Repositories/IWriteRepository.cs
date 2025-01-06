using Domain.Entites.Base;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Repositories
{
    public interface IWriteRepository<T> : IRepository<T> where T : BaseEntity
    {
        Task<bool> AddAsync(T model);
        Task<bool> AddRangeAsync(List<T> models);
        bool Delete(T model);
        bool DeleteRange(List<T> models);
        Task<bool> DeleteAsync(string id);
        bool Update (T model);
        Task<int> SaveAsync();
    }
}
