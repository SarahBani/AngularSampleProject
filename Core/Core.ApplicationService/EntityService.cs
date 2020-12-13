using Core.ApplicationService.Contracts;
using Core.ApplicationService.Implementation;
using Core.DomainModel.Entities;
using Core.DomainService;
using Core.DomainService.Repositoy;
using System.Linq;

namespace Core.ApplicationService
{
    public class EntityService : IEntityService
    {

        #region Properties

        public IUnitOfWork UnitOfWork { get; private set; }

        #region Repositories

        public ICityRepository CityRepository { get; private set; }

        public ICountryRepository CountryRepository { get; private set; }

        public IBankRepository BankRepository { get; private set; }

        public IBranchRepository BranchRepository { get; private set; }

        public IHotelRepository HotelRepository { get; private set; }

        public IHotelPhotoRepository HotelPhotoRepository { get; private set; }

        public IHotelRoomRepository HotelRoomRepository { get; private set; }

        #endregion /Repositories

        #region Services

        private ICityService _cityService;
        public ICityService CityService
        {
            get
            {
                if (_cityService == null)
                {
                    _cityService = new CityService(this);

                }
                return _cityService;
            }
        }

        private ICountryService _countryService;
        public ICountryService CountryService
        {
            get
            {
                if (_countryService == null)
                {
                    _countryService = new CountryService(this);

                }
                return _countryService;
            }
        }

        private IBankService _bankService;
        public IBankService BankService
        {
            get
            {
                if (_bankService == null)
                {
                    _bankService = new BankService(this);

                }
                return _bankService;
            }
        }

        private IBranchService _branchService;
        public IBranchService BranchService
        {
            get
            {
                if (_branchService == null)
                {
                    _branchService = new BranchService(this);

                }
                return _branchService;
            }
        }

        private IHotelService _hotelService;
        public IHotelService HotelService
        {
            get
            {
                if (_hotelService == null)
                {
                    _hotelService = new HotelService(this);

                }
                return _hotelService;
            }
        }

        private IHotelPhotoService _hotelPhotoService;
        public IHotelPhotoService HotelPhotoService
        {
            get
            {
                if (_hotelPhotoService == null)
                {
                    _hotelPhotoService = new HotelPhotoService(this);

                }
                return _hotelPhotoService;
            }
        }

        private IHotelRoomService _hotelRoomService;
        public IHotelRoomService HotelRoomService
        {
            get
            {
                if (_hotelRoomService == null)
                {
                    _hotelRoomService = new HotelRoomService(this);

                }
                return _hotelRoomService;
            }
        }

        #endregion /Repositories

        #endregion /Properties

        #region Constructors

        public EntityService(IBaseReadOnlyRepository<City, long> cityRepository,
                             IBaseReadOnlyRepository<Country, short> countryRepository, 
                             IBaseRepository<Bank, int> bankRepository,
                             IBaseRepository<Branch, int> branchRepository,
                             IBaseRepository<Hotel, long> hotelRepository,
                             IBaseRepository<HotelPhoto, long> hotelPhotoRepository,
                             IBaseRepository<HotelRoom, long> hotelRoomRepository,
                             IUnitOfWork unitOfWork)
        {
            this.CityRepository = (cityRepository as ICityRepository);
            this.CountryRepository = (countryRepository as ICountryRepository);
            this.BankRepository = (bankRepository as IBankRepository);
            this.BranchRepository = (branchRepository as IBranchRepository);
            this.HotelRepository = (hotelRepository as IHotelRepository);
            this.HotelPhotoRepository = (hotelPhotoRepository as IHotelPhotoRepository);
            this.HotelRoomRepository = (hotelRoomRepository as IHotelRoomRepository);

            this.UnitOfWork = unitOfWork;
        }

        #endregion /Constructors

        #region Methods

        public IBaseReadOnlyRepository<TEntity, TKey> GetRepository<TEntity, TKey>()
          where TEntity : BaseEntity<TKey>
        {
            string entityName = typeof(TEntity).Name;

            var prop = this.GetType().GetProperties()
                .Where(q => q.Name.Equals(entityName + "Repository"))
                .SingleOrDefault();

            return prop.GetValue(this) as IBaseReadOnlyRepository<TEntity, TKey>;
        }

        #endregion /Methods

    }
}
