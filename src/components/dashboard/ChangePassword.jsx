import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { trader_changePassword, messageClear } from '../../store/reducers/authReducer';
import toast from 'react-hot-toast';
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';

const ChangePassword = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const { loader, successMessage, errorMessage, userInfo } = useSelector(
    (state) => state.auth
  );

  // Local state for form inputs
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // State for showing passwords
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'current_password') {
      setCurrentPassword(value);
    } else if (name === 'new_password') {
      setNewPassword(value);
    } else if (name === 'confirm_password') {
      setConfirmPassword(value);
    }
  };

  // Handle form submit
  const handleSubmit = (e) => {
    e.preventDefault();

    // Dispatch change password action
    dispatch(
      trader_changePassword({
        confirmPassword,
        currentPassword,
        newPassword,
        traderId: userInfo.id,
      })
    );
  };
  useEffect(() => {
    if (successMessage) {
      toast.success(successMessage);
      dispatch(messageClear());
      
      // delay for 10 seconds before reloading the page
      setTimeout(() => {
        window.location.reload();
      }, 5000); // 10000ms = 10 seconds
    } else {
      toast.error(errorMessage);
      dispatch(messageClear());
    }
  }, [successMessage, errorMessage]);
  
  
  // Toggle password visibility
  const togglePasswordVisibility = (field) => {
    if (field === 'current') {
      setShowCurrentPassword(!showCurrentPassword);
    } else if (field === 'new') {
      setShowNewPassword(!showNewPassword);
    } else if (field === 'confirm') {
      setShowConfirmPassword(!showConfirmPassword);
    }
  };

  return (
    <div className="p-4 bg-white w-[40%] md-lg:w-full">
      <h2 className="text-base font-bold text-slate-600 pb-2">Change Password</h2>
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col gap-1 mb-2">
          <label className="font-bold text-slate-500" htmlFor="current_password">
            CURRENT PASSWORD
          </label>
          <div className="relative">
            <input
              className="outline-none w-full px-3 py-1 pr-[60px] border rounded-md text-slate-600"
              type={showCurrentPassword ? 'text' : 'password'}
              name="current_password"
              id="current_password"
              placeholder="CURRENT PASSWORD"
              value={currentPassword}
              onChange={handleChange}
            />
            <button
              type="button"
              onClick={() => togglePasswordVisibility('current')}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-600"
            >
              {!showCurrentPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
        </div>

        <div className="flex flex-col gap-1 mb-2">
          <label className="font-bold text-slate-500" htmlFor="new_password">
            NEW PASSWORD
          </label>
          <div className="relative">
            <input
              className="outline-none px-3 py-1 border rounded-md text-slate-600"
              type={showNewPassword ? 'text' : 'password'}
              name="new_password"
              id="new_password"
              placeholder="NEW PASSWORD"
              value={newPassword}
              onChange={handleChange}
            />
            <button
              type="button"
              onClick={() => togglePasswordVisibility('new')}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-600"
            >
              {!showNewPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
        </div>

        <div className="flex flex-col gap-1 mb-2">
          <label className="font-bold text-slate-500" htmlFor="confirm_password">
            CONFIRM PASSWORD
          </label>
          <div className="relative">
            <input
              className="outline-none px-3 py-1 border rounded-md text-slate-600"
              type={showConfirmPassword ? 'text' : 'password'}
              name="confirm_password"
              id="confirm_password"
              placeholder="CONFIRM PASSWORD"
              value={confirmPassword}
              onChange={handleChange}
            />
            <button
              type="button"
              onClick={() => togglePasswordVisibility('confirm')}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-600"
            >
              {!showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
        </div>

        {errorMessage && (
          <div className="text-red-600 text-sm">
            <p>{errorMessage}</p>
          </div>
        )}

        {successMessage && (
          <div className="text-green-600 text-sm">
            <p>{successMessage}</p>
          </div>
        )}

        <div className="">
          <button
            type="submit"
            className="px-5 py-2 w-full bg-primaryDark font-bold text-slate-200 rounded-md hover:shadow-md"
            disabled={loader}
          >
            {loader ? 'Updating...' : 'UPDATE'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ChangePassword;
