import importlib
import inspect
from pathlib import Path
import sqlalchemy as sql


def import_models():
    current_dir = Path(__file__).parent

    for path in current_dir.glob("[!_]*.py"):
        module_name = f".{path.stem}"
        module = importlib.import_module(module_name, package=__name__)

        for name, obj in inspect.getmembers(module):
            # klase modeli
            if inspect.isclass(obj) and hasattr(obj, '__tablename__'):
                globals()[name] = obj

            # Table objekti
            elif isinstance(obj, sql.Table):
                globals()[name] = obj
