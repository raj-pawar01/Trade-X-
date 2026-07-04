import React from "react";

const Dropdowns = () => {
  return (
    <div className="container my-3">
      <div className="account-box border rounded">
        <div className="d-flex align-items-center px-3 py-3 justify-content-between header-row">
          <div className="d-flex align-items-center">
            <span className="icon-box me-3">
              <i class="fa-solid fa-circle-plus"></i>
            </span>
            <h5 className="mb-0">Account Opening</h5>
          </div>

          <i class="fa-solid fa-caret-down"></i>
        </div>

        {/* Expanded content - static */}
        <div className="content-area px-5 py-3">
          <ul className="list-unstyled">
            <li className="my-2 blue-link">Resident individual</li>
            <li className="my-2 blue-link">Minor</li>
            <li className="my-2 blue-link">Non Resident Indian (NRI)</li>
            <li className="my-2 blue-link">
              Company, Partnership, HUF and LLP
            </li>
            <li className="my-2 blue-link">Glossary</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

// const Dropdowns = () => {
//   return (
//     <>
//       <div className="container p-5">
//         <div class="dropdown">
//           <button
//             class="btn dropdown-toggle"
//             type="button"
//             data-bs-toggle="dropdown"
//             aria-expanded="true"
//           >
//             <h4>Account Opening</h4>
//           </button>
//           <ul class="dropdown-menu">
//             <li>
//               <a class="dropdown-item" href="#">
//                 Minor
//               </a>
//             </li>
//             <li>
//               <a class="dropdown-item" href="#">
//                 Non Resident Indian (NRI)
//               </a>
//             </li>
//             <li>
//               <a class="dropdown-item" href="#">
//                 Company, Partnership, HUF and LLP
//               </a>
//             </li>
//             <li>
//               <a href="#">Glossary</a>
//             </li>
//           </ul>
//         </div>
//       </div>
//     </>
//   );
// };

export default Dropdowns;
