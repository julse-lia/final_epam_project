"""
Employee service module used to realize interaction with database, this module
defines the following class:
- EmployeeService which is an employee serialization and deserialization schema
"""
from typing import List
from sqlalchemy import and_

from department_app.extensions import db
from department_app.models.employee import EmployeeModel


class EmployeeService:
    """
    Employee service used to make database queries.
    """
    @classmethod
    def find_by_uuid(cls, uuid):
        """
        Fetches an employee by given uuid from the database.
        :param uuid: employee`s uuid
        :return: employee with given uuid
        """
        return db.session.query(EmployeeModel).filter_by(uuid=uuid).first()

    @classmethod
    def find_all(cls) -> List[EmployeeModel]:
        """
        Fetches all the employees from the database.
        :return: list of all the employees
        """
        return db.session.query(EmployeeModel).all()

    @classmethod
    def save_to_db(cls, employee_object):
        """
        Saves provided employee in the database.
        :param employee_object: given employee
        """
        db.session.add(employee_object)
        db.session.commit()

    @classmethod
    def delete_from_db(cls, employee_object):
        """
        Deletes provided employee from database.
        :param employee_object: given employee
        """
        db.session.delete(employee_object)
        db.session.commit()

    @classmethod
    def update_in_db(cls):
        """
        Updates given employee in the database and saves changes.
        """
        db.session.commit()

    @classmethod
    def find_by_birth_date(cls, date) -> List[EmployeeModel]:
        """
        Returns a list of all the employees born on a specific date.
        :param date: given date of birth
        :return: list of found employees
        """
        employees = db.session.query(EmployeeModel).filter_by(birth_date=date).all()
        return employees

    @classmethod
    def find_by_birth_period(cls, start_date, end_date) -> List[EmployeeModel]:
        """
        Returns a list of all the employees born in a period between dates.
        :param start_date: start date of birth
        :param end_date: end date of birth
        :return: list of found employees
        """
        employees = db.session.query(
            EmployeeModel).filter(
            and_(EmployeeModel.birth_date > start_date,
                 EmployeeModel.birth_date < end_date
                 )
        ).all()
        return employees
